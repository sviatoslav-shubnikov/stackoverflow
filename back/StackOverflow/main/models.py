from django.db import models
from django.conf import settings

class Topic(models.Model):
    title = models.CharField(max_length=255)
    username = models.CharField(max_length=150)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Message(models.Model):
    QUESTION = 'Q'
    ANSWER = 'A'
    TYPE_CHOICES = [
        (QUESTION, 'Question'),
        (ANSWER, 'Answer'),
    ]

    topic = models.ForeignKey(Topic, related_name='messages', on_delete=models.CASCADE)
    message_type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    username = models.CharField(max_length=150)  
    text = models.TextField()
    positive_reactions = models.IntegerField(default=0)
    negative_reactions = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_message_type_display()} by {self.username}"