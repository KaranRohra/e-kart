from accounts import models
from accounts import serializers
from rest_framework import generics


class RegisterAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSeraliser
    queryset = models.User.objects.all()
