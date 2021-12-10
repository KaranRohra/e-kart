from accounts import serializers as account_serializers
from orders import models
from products import serializers as product_serializers
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    product = product_serializers.ProductSerializer(read_only=True)
    address = account_serializers.AddressSerializer(read_only=True)

    class Meta:
        model = models.Order
        fields = "__all__"
