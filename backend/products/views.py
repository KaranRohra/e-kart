from products import models
from products import serializers
from products.models import RecentlyViewed
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
    queryset = models.Product.objects.all().order_by("?")
    pagination_class = ProductPagination


class WishlistAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        product = request.user.wishlist.products.all()
        data = serializers.ProductSerializer(product, many=True).data
        get_absolute_url(request, data)
        return Response(data)

    def put(self, request):
        product_id = request.data.get("id")
        if product_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        request.user.wishlist.products.add(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product added to wishlist"})

    def delete(self, request):
        product_id = request.data.get("id")
        if product_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        request.user.wishlist.products.remove(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product removed from wishlist"})


class RecentlyViewedAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        recentlyViewed_products = RecentlyViewed.products.through.objects.filter(
            recentlyviewed_id=request.user.recently_viewed.id
        ).order_by("-id")[:10]
        products = map(lambda x: x.product, recentlyViewed_products)

        serializer = serializers.ProductSerializer(products, many=True)
        for product in serializer.data:
            for image in product["images"]:
                image["image_url"] = request.build_absolute_uri(image["image_url"])
        return Response(serializer.data)

    def put(self, request):
        product_id = request.data.get("id")
        if product_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})

        request.user.recently_viewed.products.remove(product_id)
        request.user.recently_viewed.products.add(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product added to recently viewed"})


def get_absolute_url(request, data):
    for product in data:
        for image in product["images"]:
            image["image_url"] = request.build_absolute_uri(image["image_url"])
