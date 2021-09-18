from products import models
from products import serializers
from rest_framework import pagination
from rest_framework import viewsets


class ProductPagination(pagination.PageNumberPagination):
    model = models.Product
    page_size = 20


class ProductAPI(viewsets.ModelViewSet):
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()
    pagination_class = ProductPagination
