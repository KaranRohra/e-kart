from accounts import models
from accounts import serializers
from django.conf import settings
from django.http.response import JsonResponse
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class RegisterAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()


class UserAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        new_email = request.data.get("new_email")
        if current_password and new_password:
            if request.user.check_password(current_password):
                request.user.set_password(new_password)
                request.user.save()
                return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
            else:
                return Response(
                    data={
                        "current_password": "wrong password",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        elif new_email:
            user = models.User.objects.filter(email=new_email).first()
            if user:
                return Response(
                    data={
                        "new_email": "Email already exists",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                request.user.email = new_email
                request.user.save()
                return Response({"message": "Email changed successfully"}, status=status.HTTP_200_OK)
        else:
            user = serializers.UserSerializer(instance=request.user, data=request.data, partial=True)
            if user.is_valid():
                user.save()
                return self.get(request)
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


class UserForgotPasswordAPI(views.APIView):
    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.data["token"])
        user = models.User.objects.get(id=token.user_id)
        password = request.data["password"]
        user.set_password(password)
        user.save()
        return Response()


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
    return JsonResponse(response)


class AddressAPI(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer

    def get_queryset(self):
        return models.Address.objects.filter(user=self.request.user, is_deleted=False)
