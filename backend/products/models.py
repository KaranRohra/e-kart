from accounts import models as accounts_models
from django.db import models


class Product(models.Model):
    short_title = models.CharField(max_length=70)
    long_title = models.CharField(max_length=256)
    mrp = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    shipping_fee = models.PositiveIntegerField()
    description = models.TextField()
    discount = models.PositiveIntegerField()
    tagline = models.CharField(max_length=200)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images", related_query_name="image")
    image_url = models.ImageField(upload_to="product_images/")


class SpecificationTitle(models.Model):
    title = models.CharField(max_length=90)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="specification_titles", related_query_name="specification_title"
    )


class Specification(models.Model):
    name = models.CharField(max_length=90)
    value = models.CharField(max_length=90)
    specification_title = models.ForeignKey(
        SpecificationTitle, on_delete=models.CASCADE, related_name="specifications", related_query_name="specification"
    )


class RatingAndReview(models.Model):
    stars = models.PositiveIntegerField()
    description = models.TextField()
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="review_and_ratings", related_query_name="rating_and_review"
    )


class WishList(models.Model):
    product = models.ManyToManyField(Product, related_name="wishlists", related_query_name="wishlist")
    user = models.OneToOneField(accounts_models.User)
