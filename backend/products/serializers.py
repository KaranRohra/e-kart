from accounts import serializers as accounts_serializers
from products import models
from rest_framework import serializers


class RatingsAndReviewsLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RatingsAndReviewsLike
        fields = "__all__"


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Specification
        fields = ("name", "value")


class SpecificationTitleSerializer(serializers.ModelSerializer):
    specifications = SpecificationSerializer(many=True, read_only=True)

    class Meta:
        model = models.SpecificationTitle
        fields = ("title", "specifications")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductImage
        fields = ("image_url",)


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    specification_titles = SpecificationTitleSerializer(many=True, read_only=True)
    seller = accounts_serializers.UserSerializer()

    class Meta:
        model = models.Product
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RatingAndReview
        fields = "__all__"
