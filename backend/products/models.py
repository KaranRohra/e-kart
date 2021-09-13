from accounts import models as accounts_models
from django.db import models
from products import constants


class Product(models.Model):
    short_title = models.CharField(max_length=70)
    long_title = models.CharField(max_length=256)
    actual_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(default=1)
    shipping_fee = models.PositiveIntegerField(default=0)
    description = models.TextField()
    discount = models.PositiveIntegerField()
    tagline = models.CharField(max_length=200)
    category = models.CharField(max_length=70, choices=constants.CATEGORY)
    sub_category = models.CharField(max_length=70, choices=constants.SUB_CATEGORY, null=True, blank=True)
    seller = models.ForeignKey(
        accounts_models.User,
        on_delete=models.CASCADE,
        related_name="products",
        related_query_name="product",
        editable=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} __ {self.short_title}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images", related_query_name="image")
    image_url = models.ImageField(upload_to="product_images/")

    def __str__(self):
        return f"{self.id} __ {self.image_url}"


class SpecificationTitle(models.Model):
    title = models.CharField(max_length=90)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="specification_titles", related_query_name="specification_title"
    )

    def __str__(self):
        return f"{self.id} __ {self.title}"

    class Meta:
        verbose_name_plural = "Specifications"


class Specification(models.Model):
    name = models.CharField(max_length=256)
    value = models.CharField(max_length=256)
    specification_title = models.ForeignKey(
        SpecificationTitle, on_delete=models.CASCADE, related_name="specifications", related_query_name="specification"
    )

    def __str__(self):
        return f"{self.id} __ {self.name}"


class RatingAndReview(models.Model):
    likes = models.PositiveIntegerField()
    dislikes = models.PositiveIntegerField()
    stars = models.PositiveIntegerField()
    description = models.TextField()
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews_and_ratings", related_query_name="review_and_rating"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} __ {self.title}"


class WishList(models.Model):
    product = models.ManyToManyField(Product)
    user = models.OneToOneField(accounts_models.User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} __ {self.user}"

    class Meta:
        verbose_name_plural = "Wishlist"
