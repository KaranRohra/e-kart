from django.urls import path
from orders import views

urlpatterns = [
    path("payment/", views.order_payment, name="order-payment"),
    path("paymenthandler/<str:t>/<int:aid>/", views.paymenthandler, name="paymenthandler"),
    path("", views.OrdersAPI.as_view(), name="orders"),
]
