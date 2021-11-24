from cart import models
from products import serializers
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CartAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request):
        objects_to_create = (models.Cart(user=request.user), models.SaveForLater(user=request.user))
        for obj in objects_to_create:
            obj.save()
        return Response(status=status.HTTP_201_CREATED)

    def get(self, request):
        if request.query_params.get("type") == "SAVE_FOR_LATER":
            products = request.user.save_for_later.products.all()
        else:
            products = request.user.cart.products.all()
        serializer = serializers.ProductSerializer(products, many=True)
        for product in serializer.data:
            for image in product["images"]:
                image["image_url"] = request.build_absolute_uri(image["image_url"])
        return Response(serializer.data)

    def put(self, request):
        product_id = request.data.get("id")
        if not product_id:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        try:
            if request.data.get("type") == "SAVE_FOR_LATER":
                request.user.save_for_later.products.add(product_id)
            else:
                request.user.cart.products.add(product_id)
            return Response(status=status.HTTP_200_OK, data={"message": "Product added to cart"})
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product not found", "error": str(e)})

    def delete(self, request):
        product_id = request.data.get("id")
        if not product_id:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Product id is required"})
        obj = request.user.save_for_later if request.data.get("type") == "SAVE_FOR_LATER" else request.user.cart
        obj.products.remove(product_id)
        return Response(status=status.HTTP_200_OK, data={"message": "Product removed from cart"})
