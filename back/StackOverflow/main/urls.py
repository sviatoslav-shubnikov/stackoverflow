from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TopicViewSet, MessageViewSet, LatestTopicView, MessagesByTopicTitleView, IncrementTopicViews

router = DefaultRouter()
router.register(r'topics', TopicViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = [
  path('', include(router.urls)),
	path('latest-topic/', LatestTopicView.as_view(), name='latest-topic'),
	path('messages/by-topic-title/<str:title>/questions/', MessagesByTopicTitleView.as_view(), name='messages-by-topic-title-questions'),
  path('messages/by-topic-title/<str:title>/answers/', MessagesByTopicTitleView.as_view(), name='messages-by-topic-title-answers'),
	path('topics/<int:id>/increment-views/', IncrementTopicViews.as_view(), name='increment-topic-views'),
	# path('messages/<int:id>/like/', MessageViewSet.as_view({'post': 'like'}), name='message-like'),
  # path('messages/<int:id>/dislike/', MessageViewSet.as_view({'post': 'dislike'}), name='message-dislike'),
]