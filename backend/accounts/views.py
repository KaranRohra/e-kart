from accounts import models
from accounts import serializers
from django.conf import settings
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.response import Response


class RegisterAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSerializers
    queryset = models.User.objects.all()


class UserAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        serializer = serializers.UserSerializers(request.user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        data = dict(request.data)
        password = data.get("password")
        if password:
            request.user.set_password(password[0])

        user = serializers.UserSerializers(instance=request.user, data=request.data, partial=True)
        if user.is_valid():
            user.save()
            return self.get(request)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


def send_reset_link_api(request):
    try:
        user = models.User.objects.get(email=request.GET["email"])
        user.email_user(
            subject="E-kart OTP",
            message=f"""
            Your Reset Link
            {settings.CORS_ALLOWED_ORIGINS[0]}/reset-password/?token={user.auth_token}
            Don't share this link with anyone.
            Don't reply to this email.
            """,
        )
        response = {
            "status": "success",
        }
    except Exception as e:
        response = {
            "status": "failure",
            "message": str(e),
        }
    return Response(response)


class AddressAPI(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializers

    def get_queryset(self):
        return models.Address.objects.filter(user=self.request.user)
