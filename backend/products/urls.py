from django.urls import path
from products import views
from rest_framework import routers

route = routers.DefaultRouter()
route.register("", views.ProductAPI, basename="products")
urlpatterns = [
    path("wishlist/", views.WishlistAPI.as_view(), name="wishlist"),
] + route.urls
