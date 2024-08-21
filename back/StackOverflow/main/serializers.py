from rest_framework import serializers
from .models import Topic, Message

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'username', 'created_at', 'updated_at', 'views']
        read_only_fields = ['username']
       
class MessageSerializer(serializers.ModelSerializer):
    topic_title = serializers.ReadOnlyField(source='topic.title')

    class Meta:
        model = Message
        fields = ['id', 'topic', 'topic_title', 'message_type', 'username', 'text', 'positive_reactions', 'negative_reactions', 'created_at']
        read_only_fields = ['username']

    