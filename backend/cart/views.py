from products import serializers
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CartAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        products = request.user.cart.products.all()
        serializer = serializers.ProductSerializer(products, many=True)
        return Response(serializer.data)

    def put(self, request):
        product_id = request.data["id"]
        request.user.cart.products.add(id=product_id)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, **kwargs):
        product_id = kwargs["id"]
        request.user.cart.products.delete(id=product_id)
        return Response(status=status.HTTP_200_OK)
