from accounts import models as accounts_models
from django.db import models


class Product(models.Model):
    short_title = models.CharField(max_length=70)
    long_title = models.CharField(max_length=900)
    mrp = models.PositiveIntegerField()
    cost = models.PositiveIntegerField()
    description = models.TextField()
    discount = models.PositiveIntegerField()
    tagline = models.CharField(max_length=200)


class ProductImage(models.Model):
    image_name = models.CharField(max_length=90)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image_url = models.ImageField(upload_to="images/")


class SpecificationTitle(models.Model):
    title = models.CharField(max_length=90)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class Specifications(models.Model):
    content = models.JSONField()
    specification_title = models.ForeignKey(SpecificationTitle, on_delete=models.CASCADE)


class RatingAndReview(models.Model):
    stars = models.PositiveIntegerField()
    description = models.CharField(max_length=900)
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class WishList(models.Model):
    product = models.ManyToManyField(Product)
    user = models.OneToOneField(accounts_models.User)
