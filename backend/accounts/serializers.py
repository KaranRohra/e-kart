from accounts import models
from rest_framework import serializers


class UserSeraliser(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(required=False)

    def create(self, validated_data):
        user = models.User(**validated_data, is_staff=True, is_superuser=True)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        if validated_data.get("password"):
            instance.set_password(validated_data["password"])
        instance.save()
        return instance

    class Meta:
        model = models.User
        fields = ("id", "first_name", "last_name", "email", "password", "phone_number")
