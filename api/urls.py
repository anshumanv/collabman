from django.urls import include, path
from django.conf.urls import url
from  .views import ProfileAPIView


from . import views

urlpatterns = [
	url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls')),
    path("user/<int:pk>/", ProfileAPIView.as_view(), name="user_details")
]
