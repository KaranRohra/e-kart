from accounts import views
from django.urls import path
from rest_framework import routers
from rest_framework.authtoken import views as rest_framework_views

route = routers.DefaultRouter()
route.register("address", views.AddressAPI, basename="address")
urlpatterns = [
    path("login/", rest_framework_views.obtain_auth_token, name="login"),
    path("register/", views.RegisterAPI.as_view(), name="register"),
    path("reset-password/", views.send_reset_link_api, name="reset-link"),
    path("user/", views.UserAPI.as_view(), name="user"),
    path("forgot-password/", views.UserForgotPasswordAPI.as_view(), name="user"),
] + route.urls
