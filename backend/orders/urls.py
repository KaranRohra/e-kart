from django.urls import path
from orders import views
from rest_framework import routers

routes = routers.DefaultRouter()
routes.register("", views.OrdersAPI, basename="orders")

urlpatterns = [
    path("payment/", views.order_payment, name="order-payment"),
    path("paymenthandler/<str:t>/<int:aid>/", views.paymenthandler, name="paymenthandler"),
    path("product/<int:id>/", views.ProductSalesGraphAPI.as_view(), name="product-sales-graph"),
] + routes.urls
