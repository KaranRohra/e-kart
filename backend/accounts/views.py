from accounts import models
from accounts import serializers
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response


class RegisterAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSeraliser
    queryset = models.User.objects.all()


class DetailsAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        # request.user.first_name = request.POST.get('first_name')
        # request.user.last_name = request.POST.get('last_name')
        # request.user.save()
        # # models.Interest.objects.create(user=request.user, interest=request.POST.get('interest'))

        # interests = []
        # for interest in request.POST["interests"]:
        #     interests.append(

        #     )

        return Response({"sataus": "hello"})
