from django.urls import include, path
from django.conf.urls import url
from .views import (
    ProfileAPIView, 
    UserCreate, LoginView, 
    ProfileList, ProfileCreate, 
    ProjectList, ProjectView, 
    DocTypeListView, DocTypeView, 
    DocumentListView, DocumentView, 
    TaskListView, TaskView, 
    SubtaskListView, SubtaskView, 
    SubtaskLogListView, SubtaskLogView,
    LoginGithubView,
    Logout
)

from . import views

urlpatterns = [
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^logout/', Logout.as_view()),
    path('github_token/',LoginGithubView.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path("user/<str:username>/", ProfileAPIView.as_view(), name="user_details"),
    path("user/", ProfileList.as_view(), name="profile_list"),
    path("user/signup/", UserCreate.as_view(), name="user_create"),
    path("user/signup/profile/", ProfileCreate.as_view(), name="user_create"),
    path("user/login/", LoginView.as_view(), name="login"),
    path("<str:username>/project/", ProjectList.as_view(),name='view_user_projects'),
    path("<str:username>/project/<str:project_slug>/",ProjectView.as_view(), name='view_user_project'),
    path("doctype/all/", DocTypeListView.as_view(), name='checkout_all_doc_type'),
    path("doctype/<int:did>/", DocTypeView.as_view(), name='checkout_doc_type'),
    path("<str:username>/project/<str:project_slug>/document/",DocumentListView.as_view(), name='documents_list'),
    path("<str:username>/project/<str:project_slug>/document/<int:docid>/",DocumentView.as_view(), name='documents_view'),
    path("<str:username>/project/<str:project_slug>/task/",TaskListView.as_view(), name='task_list'),
    path("<str:username>/project/<str:project_slug>/task/<int:tid>/",TaskView.as_view(), name='task_view'),
    path("<str:username>/project/<str:project_slug>/task/<int:tid>/subtask/",SubtaskListView.as_view(), name='subtask_list_view'),
    path("<str:username>/project/<str:project_slug>/task/<int:tid>/subtask/<int:subid>/", SubtaskView.as_view(), name='subtask_view'),
    path("<str:username>/project/<str:project_slug>/task/<int:tid>/subtask/<int:subid>/sublog/", SubtaskLogListView.as_view(), name='sublogList_view'),
    path("<str:username>/project/<str:project_slug>/task/<int:tid>/subtask/<int:subid>/sublog/<int:sublogid>",SubtaskLogView.as_view(), name='sublog_view'),
]  
