from accounts import models as accounts_models
from django.db import models
from products import models as products_models


class Orders(models.Model):
    user = models.ForeignKey(accounts_models.User, on_delete=models.CASCADE)
    address = models.OneToOneField(accounts_models.Address, on_delete=models.CASCADE)
    product = models.ForeignKey(products_models.Product)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_=True)
