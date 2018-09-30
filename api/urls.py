from django.urls import include, path
from django.conf.urls import url
from  .views import ProfileAPIView, UserCreate, LoginView, ProfileList, ProfileCreate


from . import views

urlpatterns = [
	url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls')),
    path("user/<int:pk>/", ProfileAPIView.as_view(), name="user_details"),
    path("user/", ProfileList.as_view(), name="profile_list"),
    path("user/signup/", UserCreate.as_view(), name="user_create"),
    path("user/signup/profile", ProfileCreate.as_view(), name="user_create"),
    path("user/login/", LoginView.as_view(), name="login")
]   
