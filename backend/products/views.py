from products import models
from products import serializers
from rest_framework import authentication
from rest_framework import pagination
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.response import Response


class ProductPagination(pagination.PageNumberPagination):
    model = models.Product
    page_size = 20


class ProductAPI(viewsets.ModelViewSet):
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()
    pagination_class = ProductPagination


class WishlistAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request):
        whishlist = models.WishList()
        whishlist.user = request.user
        whishlist.save()
        return Response(status=status.HTTP_201_CREATED)

    def get(self, request):
        products = request.user.wishlist.products.all()
        serializer = serializers.WishListSerializer(products, many=True)
        return Response(serializer.data)

    def put(self, request):
        product_id = request.data.get("id")
        request.user.wishlist.product.add(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product added to wishlist"})

    def delete(self, request):
        product_id = request.data.get("id")
        request.user.wishlist.product.remove(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product removed from wishlist"})
