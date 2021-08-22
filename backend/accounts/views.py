from accounts import models
from accounts import serializers
from django.conf import settings
from django.http import JsonResponse
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views


class RegisterAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSeraliser
    queryset = models.User.objects.all()


class UserAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        serializer = serializers.UserSeraliser(request.user)
        return JsonResponse(serializer.data)

    def patch(self, request, *args, **kwargs):
        user = serializers.UserSeraliser(instance=request.user, data=request.data, partial=True)
        if user.is_valid():
            user.save()
            return self.get(request)
        return JsonResponse(user.errors, status=status.HTTP_400_BAD_REQUEST)


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
