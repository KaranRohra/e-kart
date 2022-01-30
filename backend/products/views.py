from products import models
from products import serializers
from rest_framework import authentication
from rest_framework import generics
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


class WishlistProductAPI(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()

    def get_queryset(self):
        return self.request.user.wishlist.products.all()


class WishlistAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        response = WishlistProductAPI.as_view()(request._request)
        return Response(response.data)

    def put(self, request):
        product_id = request.data.get("id")
        data = put_product(request.user.wishlist, product_id, "wishlist")
        return Response(data)

    def delete(self, request):
        product_id = request.data.get("id")
        if product_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        request.user.wishlist.products.remove(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product removed from wishlist"})


class RecentlyViewedProductAPI(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()

    def get_queryset(self):
        recentlyViewed_products = models.RecentlyViewed.products.through.objects.filter(
            recentlyviewed_id=self.request.user.recently_viewed.id
        ).order_by("-id")[:10]
        products = map(lambda x: x.product, recentlyViewed_products)
        return products


class RecentlyViewedAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        response = RecentlyViewedProductAPI.as_view()(request._request)
        return Response(response.data)

    def put(self, request):
        product_id = request.data.get("id")
        request.user.recently_viewed.products.remove(product_id)
        data = put_product(request.user.recently_viewed, product_id, "recently viewed")
        return Response(data)


def put_product(model, product_id, message):
    if product_id is None:
        return {"status": status.HTTP_400_BAD_REQUEST, "data": {"message": "Product id is required"}}
    model.products.add(product_id)

    return {"status": status.HTTP_200_OK, "data": {"message": "Product added to " + message}}
