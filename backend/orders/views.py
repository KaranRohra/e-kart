from functools import reduce

import razorpay
from accounts import models as accounts_models
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db.models import Sum
from django.http import Http404
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags
from django.views.decorators.csrf import csrf_exempt
from orders import models
from orders import serializers
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import views
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class ProductSalesGraphAPI(views.APIView):
    def get(self, request, *args, **kwargs):
        orders = models.Order.objects.filter(product__id=kwargs["id"], status="Delivered")
        month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        x_axis, y_axis = [], []
        curr_month = timezone.now().month - 1
        for _ in range(12):
            x_axis.append(month[curr_month])
            y_axis.append(orders.filter(created_at__month=curr_month + 1).count())
            curr_month = (curr_month - 1) % 12

        x_axis = x_axis[::-1]
        y_axis = y_axis[::-1]

        data = {
            "x_axis": x_axis,
            "y_axis": y_axis,
        }
        return Response(data)


class OrdersAPI(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = serializers.OrderSerializer

    def get_queryset(self):
        return models.Order.objects.filter(user=self.request.user).order_by("-created_at")

    def partial_update(self, request, pk=None):
        instance = self.get_object()
        instance.status = request.data.get("status")
        send_order_status_email(
            orders=[instance],
            address=instance.address,
            user=request.user,
            subject=f"Order {instance.status}",
        )
        return super().partial_update(request, pk=pk)


razorpay_client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))


def get_order_amount(t):
    token = Token.objects.get(key=t)
    user = accounts_models.User.objects.get(id=token.user_id)
    amount = user.cart.products.all().aggregate(Sum("selling_price"), Sum("shipping_fee"))
    return (amount["selling_price__sum"] + amount["shipping_fee__sum"]) * 100, user


def order_payment(request):
    try:
        token = request.GET.get("t").split()[1]
        address_id = request.GET["aid"]
        currency = "INR"
        amount, user = get_order_amount(token)
        if user.cart.products.all().count() == 0:
            raise Http404

        razorpay_order = razorpay_client.order.create({"amount": amount, "currency": currency, "payment_capture": "1"})

        context = {
            "razorpay_order_id": razorpay_order["id"],
            "razorpay_amount": amount,
            "razorpay_merchant_key": settings.RAZOR_KEY_ID,
            "currency": currency,
            "callback_url": f"/orders/paymenthandler/{token}/{address_id}/",
        }
        return render(request, "orders/payment.html", context=context)
    except Exception:
        raise Http404


@csrf_exempt
def paymenthandler(request, t, aid):
    if request.method != "POST":
        raise Http404

    template_name = "orders/payment-status.html"
    payment_id = request.POST.get("razorpay_payment_id", "")
    razorpay_order_id = request.POST.get("razorpay_order_id", "")
    signature = request.POST.get("razorpay_signature", "")
    params_dict = {
        "razorpay_order_id": razorpay_order_id,
        "razorpay_payment_id": payment_id,
        "razorpay_signature": signature,
    }
    result = razorpay_client.utility.verify_payment_signature(params_dict)
    context = {
        "orders_url": settings.CORS_ALLOWED_ORIGINS[0] + "/orders",
        "home_url": settings.CORS_ALLOWED_ORIGINS[0],
        "order_again_url": settings.CORS_ALLOWED_ORIGINS[0] + "/review-order",
    }
    if result is None:
        amount, user = get_order_amount(t)
        ordered_products = user.cart.products.all()
        orders = []
        for product in ordered_products:
            # TODO: product.quantity -= 1 Decrement quantity
            order = models.Order.objects.create(
                user=user, product=product, address=accounts_models.Address.objects.get(id=aid)
            )
            orders.append(order)
            order.save()
        user.cart.products.clear()
        try:
            send_order_status_email(orders, orders[0].address, user)
            razorpay_client.payment.capture(payment_id, amount)
        except Exception:
            # If this executes, the payment was already captured
            return render(request, template_name, context={"payment_status": "SUCCESS", **context})
        return render(request, template_name, context={"payment_status": "SUCCESS", **context})
    return render(request, template_name, context={"payment_status": "FAILED", **context})


def send_order_status_email(orders, address, user, subject="Order Confirmed"):
    status = subject.split()[1]
    shipping_charges = reduce(lambda x, y: x + y.product.shipping_fee, orders, 0)
    subtotal = reduce(lambda x, y: x + y.product.selling_price, orders, 0)
    context = {
        "home_url": settings.CORS_ALLOWED_ORIGINS[0],
        "my_orders_url": settings.CORS_ALLOWED_ORIGINS[0] + "/orders",
        "orders": orders,
        "address": address,
        "shipping_charges": shipping_charges,
        "subtotal": subtotal,
        "payable_amount": subtotal + shipping_charges,
        "login_user": user,
        "status": status,
        "subject": subject,
    }
    if status == "Confirmed":
        context["delivery_date"] = (orders[0].created_at + timezone.timedelta(days=7)).date

    html_content = render_to_string("orders/email.html", context=context)
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(
        # subject
        subject,
        # message
        text_content,
        # from
        settings.EMAIL_HOST_USER,
        # to
        [user.email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
