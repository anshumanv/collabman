from django.urls import include, path
from django.conf.urls import url
from .views import ProfileAPIView, UserCreate, LoginView, ProfileList, ProfileCreate, ProjectList, ProjectView, DocTypeListView, DocTypeView, DocumentListView, DocumentView, TaskListView, TaskView, SubtaskListView, SubtaskView, SubtaskLogListView, SubtaskLogView


from . import views

urlpatterns = [
	url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls')),
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
    path("document/<int:pid>/", DocumentListView.as_view(), name='documents_list'),
    path("document/<int:pid>/<int:docid>/", DocumentView.as_view(), name='documents_view'),
    path("task/<int:pid>/", TaskListView.as_view(), name='task_list'),
    path("task/<int:pid>/<int:tid>/", TaskView.as_view(), name='task_view'),
    path("subtask/<int:pid>/<int:tid>/", SubtaskListView.as_view(), name='subtask_list_view'),
    path("subtask/<int:pid>/<int:tid>/<int:subid>/", SubtaskView.as_view(), name='subtask_view'),
    path("subtasklog/<int:pid>/<int:tid>/<int:subid>/",SubtaskLogListView.as_view(), name='subtask_view'),
    path("subtasklog/<int:pid>/<int:tid>/<int:subid>/<int:sublogid>",SubtaskLogView.as_view(), name='subtask_view'),
]  
