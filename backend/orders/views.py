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
from rest_framework import viewsets
from rest_framework.authtoken.models import Token


class OrdersAPI(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = serializers.OrderSerializer

    def get_queryset(self):
        return models.Order.objects.filter(user=self.request.user)


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
            send_order_confirmation_email(orders, orders[0].address, user)
            razorpay_client.payment.capture(payment_id, amount)
        except Exception:
            # If this executes, the payment was already captured
            return render(request, template_name, context={"payment_status": "SUCCESS", **context})
        return render(request, template_name, context={"payment_status": "SUCCESS", **context})
    return render(request, template_name, context={"payment_status": "FAILED", **context})


def send_order_confirmation_email(orders, address, user):
    shipping_charges = reduce(lambda x, y: x + y.product.shipping_fee, orders, 0)
    subtotal = reduce(lambda x, y: x + y.product.selling_price, orders, 0)
    context = {
        "orders": orders,
        "address": address,
        "shipping_charges": shipping_charges,
        "subtotal": subtotal,
        "payable_amount": subtotal + shipping_charges,
        "delivery_date": orders[0].created_at + timezone.timedelta(days=7),
        "login_user": user,
    }

    html_content = render_to_string("orders/email.html", context=context)
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(
        # subject
        "Order Confirmation",
        # message
        text_content,
        # from
        settings.EMAIL_HOST_USER,
        # to
        ["rohrakaran38@gmail.com", "ani.dhameja@gmail.com", "khushboobajaj2572002@gmail.com"],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
