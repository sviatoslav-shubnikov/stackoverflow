from rest_framework.exceptions import ValidationError
from rest_framework import viewsets, generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .funcs.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from .models import Topic, Message
from rest_framework import status
from .serializers import TopicSerializer, MessageSerializer
from rest_framework.generics import RetrieveAPIView


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            serializer.save(username=user.username)
        else:
            raise ValidationError("User is not authenticated.")

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            serializer.save(username=user.username)
        else:
            raise ValidationError("User is not authenticated.")

class LatestTopicView(RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get_object(self):
        return self.queryset.order_by("id").last()
    
class MessagesByTopicTitleView(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        title = self.kwargs['title']
        print(f"Title received: {title}")

        if 'questions' in self.request.path:
            message_type = Message.QUESTION
        elif 'answers' in self.request.path:
            message_type = Message.ANSWER
        else:
            message_type = None

        queryset = Message.objects.filter(topic__title=title)

        if message_type:
            queryset = queryset.filter(message_type=message_type)

        return queryset