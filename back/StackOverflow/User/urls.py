
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, LogoutView


urlpatterns = [
    path('sign-up/', RegisterView.as_view(), name='sign-up'),
    path('sign-in/', LoginView.as_view(), name='sign-in'),
 	path('logout/', LogoutView.as_view(), name='logout'),
]