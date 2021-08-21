from accounts import views
from django.urls import path
from rest_framework.authtoken import views as rest_framework_views

urlpatterns = [
    path("login/", rest_framework_views.obtain_auth_token, name="login"),
    path("register/", views.RegisterAPI.as_view(), name="register"),
    path("send-otp/", views.send_email_to_user, name="send-otp"),
    path("user/", views.UserDetailsAPI.as_view(), name="user"),
]
