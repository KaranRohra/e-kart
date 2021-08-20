from accounts import models
from rest_framework import serializers


class UserSeraliser(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = models.User(**validated_data)
        user.is_superuser = True
        user.is_staff = True
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = models.User
        fields = ("first_name", "last_name", "email", "password")


# class DetailSerializer(serializers.Serializer):
#     interest
