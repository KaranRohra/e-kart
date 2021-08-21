import random

from accounts import models
from accounts import serializers
from django.http import JsonResponse
from rest_framework import generics


class RegisterAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSeraliser
    queryset = models.User.objects.all()


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
