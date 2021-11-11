from cart import views
from django.urls import path

urlpatterns = [path("cart/", views.CartAPIView.as_view(), name="cart")]
