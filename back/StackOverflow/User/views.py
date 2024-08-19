from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers.user_serializer import UserSerializer
from .serializers.login_serializer import LoginSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        Token.objects.filter(user=user).delete() 
        token = Token.objects.create(user=user)
        
     
        request.session['username'] = user.username
        request.session.save()
        
        return Response({"token": token.key})

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        
        if 'username' in request.session:
            del request.session['username']
        
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)