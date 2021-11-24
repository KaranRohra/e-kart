from accounts import models as accounts_models
from django.db import models
from products import models as products_models


class Cart(models.Model):
    products = models.ManyToManyField(products_models.Product)
    user = models.OneToOneField(accounts_models.User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)


class SaveForLater(models.Model):
    products = models.ManyToManyField(products_models.Product)
    user = models.OneToOneField(
        accounts_models.User,
        on_delete=models.CASCADE,
        related_name="save_for_later",
        related_query_name="save_for_later",
    )

    def __str__(self):
        return str(self.user)
