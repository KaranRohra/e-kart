from products import models
from products import serializers
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CartProductAPI(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    query_set = models.Product.objects.all()

    def get_queryset(self):
        if self.request.query_params.get("type") == "SAVE_FOR_LATER":
            return self.request.user.save_for_later.products.all()
        return self.request.user.cart.products.all()  # Type: CART


class CartAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        response = CartProductAPI.as_view()(request._request)
        return Response(response.data)

    def put(self, request):
        product_id = request.data.get("id")
        if not product_id:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        obj = request.user.save_for_later if request.data.get("type") == "SAVE_FOR_LATER" else request.user.cart
        obj.products.add(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product added to cart"})

    def delete(self, request):
        product_id = request.data.get("id")
        if not product_id:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        obj = request.user.save_for_later if request.data.get("type") == "SAVE_FOR_LATER" else request.user.cart
        obj.products.remove(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product removed from cart"})
