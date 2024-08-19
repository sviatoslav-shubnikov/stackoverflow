# from typing import Any


# class ViewsMiddleware:
# 	def __init__(self, get_response):
# 		self.get_response = get_response

# 	def __call__(self, request):
# 		response = self.get_response(request)
# 		return response
	
# 	def process_view(self,requset, view_func, view_args, view_kwargs):
# 		if 'topic_id' in view_args:
# 			topic_id = view_args["topic_id"]
# 			viewed_topics = requset.session.get('viewed_topics',[])