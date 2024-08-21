from rest_framework.exceptions import ValidationError
from rest_framework import viewsets, generics, permissions
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .funcs.permissions import IsAuthenticatedOrReadOnly
from .models import Topic, Message
from .serializers import TopicSerializer, MessageSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny


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
        
    # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticatedOrReadOnly])
    # def like(self, request, id=None):
    #     return self.add_reaction(request, id, 'like')

    # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticatedOrReadOnly])
    # def dislike(self, request, id=None):
    #     return self.add_reaction(request, id, 'dislike')

    # def add_reaction(self, request, id, reaction_type):
    #     message = self.get_object()
    #     user = request.user

    #     try:
    #         user_reaction = UserReaction.objects.get(user=user, message=message)
    #         if user_reaction.reaction == reaction_type:
    #             return Response({'detail': f'You have already {reaction_type}d this message.'}, status=status.HTTP_400_BAD_REQUEST)
    #         else:
               
    #             if user_reaction.reaction == 'like':
    #                 message.positive_reactions -= 1
    #             else:
    #                 message.negative_reactions -= 1

    #             user_reaction.reaction = reaction_type
    #             user_reaction.save()

    #     except UserReaction.DoesNotExist:
    #         user_reaction = UserReaction(user=user, message=message, reaction=reaction_type)
    #         user_reaction.save()

    #     if reaction_type == 'like':
    #         message.positive_reactions += 1
    #     else:
    #         message.negative_reactions += 1

    #     message.save()
    #     return Response({'detail': f'Message {reaction_type}d successfully.'}, status=status.HTTP_200_OK)

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
    
class IncrementTopicViews(APIView):
    permission_classes = [AllowAny]

    def put(self, request, id):
        try:
            topic = Topic.objects.get(id=id)
            topic.views += 1
            topic.save()
            return Response({'status': 'views incremented'}, status=status.HTTP_200_OK)
        except Topic.DoesNotExist:
            return Response({'error': 'Topic not found'}, status=status.HTTP_404_NOT_FOUND)
