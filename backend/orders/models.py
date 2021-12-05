from accounts import models as accounts_models
from django.db import models
from products import models as products_models


class Order(models.Model):
    user = models.ForeignKey(accounts_models.User, on_delete=models.CASCADE)
    address = models.ForeignKey(accounts_models.Address, on_delete=models.CASCADE)
    product = models.ManyToManyField(products_models.Product)
    status = models.CharField(max_length=100, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email
