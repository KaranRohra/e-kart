import razorpay
from accounts import models as accounts_models
from django.conf import settings
from django.db.models import Sum
from django.http import Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from orders import models
from products import serializers as product_serializers
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class OrdersAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        orders = models.Order.objects.filter(user=request.user)
        orders_list = []
        for order in orders:
            orders_list.append(
                {
                    "id": order.id,
                    "products": product_serializers.ProductSerializer(order.products).data,
                    "address": order.address,
                    "status": order.status,
                }
            )
        return Response(orders_list)

    def post(self, request):
        products_ids = request.data.get("products_ids")
        products = models.Product.objects.filter(id__in=products_ids)
        order = models.Order(user=request.user)
        order.products.set(products)
        order.address = request.data.get("address")
        order.save()
        return Response(product_serializers.ProductSerializer(order.products).data)


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
        order = models.Order(
            user=user,
            address=accounts_models.Address.objects.get(id=aid),
        )
        order.save()
        order.product.set(user.cart.products.all())
        user.cart.products.clear()
        try:
            razorpay_client.payment.capture(payment_id, amount)
        except Exception:
            # If this executes, the payment was already captured
            return render(request, template_name, context={"payment_status": "SUCCESS", **context})
        return render(request, template_name, context={"payment_status": "SUCCESS", **context})
    return render(request, template_name, context={"payment_status": "FAILED", **context})
