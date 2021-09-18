from accounts import models as accounts_models
from django.db import models
from products import models as products_models

# Create your models here.


class Cart(models.Model):
    products = models.ManyToManyField(products_models.Product, related_name="carts", related_query_name="cart")
    user = models.OneToOneField(
        accounts_models.User, on_delete=models.CASCADE, related_name="carts", related_query_name="carts"
    )
