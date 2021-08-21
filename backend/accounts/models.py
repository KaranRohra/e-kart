from django.contrib.auth import models as auth_models
from django.db import models


class User(auth_models.AbstractUser):
    email = models.EmailField(max_length=254, unique=True)
    phone_number = models.CharField(max_length=10)
    USERNAME_FIELD = "email"
    username = None
    REQUIRED_FIELDS = []


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_line_1 = models.TextField()
    address_line_2 = models.TextField()
    city = models.CharField(max_length=70)
    state = models.CharField(max_length=70)
    country = models.CharField(max_length=70)
    pincode = models.PositiveIntegerField()
    name = models.CharField(max_length=70)
    landmark = models.CharField(max_length=50)
    phone_number_1 = models.CharField(max_length=10)
    phone_number_2 = models.CharField(max_length=10, null=True)
