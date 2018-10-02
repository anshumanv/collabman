from django.urls import include, path
from django.conf.urls import url
from .views import ProfileAPIView, UserCreate, LoginView, ProfileList, ProfileCreate, ProjectList, ProjectView, DocTypeListView, DocTypeView, DocumentListView, DocumentView


from . import views

urlpatterns = [
	url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls')),
    path("user/<int:pk>/", ProfileAPIView.as_view(), name="user_details"),
    path("user/", ProfileList.as_view(), name="profile_list"),
    path("user/signup/", UserCreate.as_view(), name="user_create"),
    path("user/signup/profile", ProfileCreate.as_view(), name="user_create"),
    path("user/login/", LoginView.as_view(), name="login"),
    path("project/<int:uid>/", ProjectList.as_view(), name='view_user_projects'),
    path("project/<int:uid>/<int:pid>", ProjectView.as_view(), name='view_user_project'),
    path("doctype/all", DocTypeListView.as_view(), name='checkout_all_doc_type'),
    path("doctype/<int:did>", DocTypeView.as_view(), name='checkout_doc_type'),
    path("document/<int:pid>", DocumentListView.as_view(), name='documents_list'),
    path("document/<int:pid>/<int:docid>", DocumentView.as_view(), name='documents_view')
]  
