from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TopicViewSet, MessageViewSet, LatestTopicView,MessagesByTopicTitleView

router = DefaultRouter()
router.register(r'topics', TopicViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = [
  path('', include(router.urls)),
	path('latest-topic/', LatestTopicView.as_view(), name='latest-topic'),
	path('messages/by-topic-title/<str:title>/questions/', MessagesByTopicTitleView.as_view(), name='messages-by-topic-title-questions'),
  path('messages/by-topic-title/<str:title>/answers/', MessagesByTopicTitleView.as_view(), name='messages-by-topic-title-answers'),
]