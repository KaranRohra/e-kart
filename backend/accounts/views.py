import random

from accounts import models
from accounts import serializers
from django.http import JsonResponse
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import views


class RegisterAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSeraliser
    queryset = models.User.objects.all()


class UserDetailsAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        serializer = serializers.UserSeraliser(request.user)
        return JsonResponse(serializer.data)


def generate_otp():
    return "".join([str(random.randint(0, 9)) for _ in range(6)])


def send_email_to_user(request):
    try:
        otp = generate_otp()
        user = models.User.objects.get(email=request.GET["email"])
        user.email_user(subject="E-kart OTP", message=f"Your OTP is: {otp}")
        response = {
            "status": "success",
            "otp": otp,
        }
    except Exception as e:
        response = {
            "status": "failure",
            "message": str(e),
        }
    return JsonResponse(response)
