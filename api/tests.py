from django.test import TestCase
from .models import Profile, Project, DocType, Document, Task, Subtask, SubtaskLog
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, get_list_or_404
from requests.auth import HTTPBasicAuth 
from rest_framework.test import force_authenticate
from .serializers import UserSerializer, ProfileSerializer, ProjectSerializer, DocTypeSerializer, DocumentSerializer, TaskSerializer, SubtaskSerializer, SubtaskLogSerializer
import json
## API Test

class BaseViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_user(username, password):
        user = User.objects.create_user(username=username, password=password)
        return user

    def create_profile(self, username, password, first_name, last_name, email):
        user = self.create_user(username, password)
        Profile.objects.create(user=user, first_name=first_name, last_name=last_name, email=email)

    def login_a_user(self, username="", password=""):
        url = reverse(
            "login"
        )
        return self.client.post(
            url,
            data=json.dumps({
                "username": username,
                "password": password
            }),
            content_type="application/json"
        )

    def setUp(self):
        # add test data
        self.superuser = User.objects.create_superuser(
            username="test_user",
            email="test@mail.com",
            password="testing",
            first_name="test",
            last_name="user",
        )
        self.create_profile("test1", "test1test1", "test", "one", email="testone@gmail.com")
        self.create_profile("test2", "test2test2", "test",
                            "two", email="testtwo@gmail.com")
        self.create_profile("test3", "test3test3", "test",
                            "three", email="testthree@gmail.com")
        self.create_profile("test4", "test1test1", "test",
                            "four", email="testfour@gmail.com")
        self.dummy_project = {
            "project_name": "Test Project some",
            "project_manager" : "test1",
            "project_description": "I am a test project.",
            "project_link": "http://somethingismissin.com",
            "project_chat_link": "http://knows.com",
            "calendar_api_token": "asdasd",
            "calendar_api_key": "asdasd",
            "git_api_key": "asdsadsd",
            "slack_api_key": "asdasdasds",
            "users": [
                'test1',
                'test2',
                'test3'
            ]
        }


class AuthLoginUserTest(BaseViewTest):
    """
    Tests for the auth/login/ endpoint
    """

    def test_login_user_with_valid_credentials(self):
        # test login with valid credentials
        response = self.login_a_user("test_user", "testing")
        # assert token key exists
        self.assertIn("token", response.data)
        # assert status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # test login with invalid credentials
        response = self.login_a_user("anonymous", "pass")

        # assert status code is 401 UNAUTHORIZED
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
class GetAllProfileTest(BaseViewTest):

    def test_get_all_profile(self):
        """
        This test ensures that all songs added in the setUp method
        exist when we make a GET request to the songs/ endpoint
        """
        self.client.session.auth = HTTPBasicAuth('test1', 'test1test1')
        t = self.client.login(username="test1", password="test1test1")
        response = self.client.get(
            reverse("profile_list")
        )
        # fetch the data from db
        expected = Profile.objects.all()
        serialized = ProfileSerializer(expected, many=True)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ProjectListTest(BaseViewTest):
    def setUp(self):
        return super().setUp()

    def test_project_list(self):
        self.client.session.auth = HTTPBasicAuth('test1', 'test1test1')
        self.client.login(username="test1", password="test1test1")
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()
        self.client.session.auth = HTTPBasicAuth('test1', 'test1test1')
        self.client.login(username="test1", password="test1test1")
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        response = self.client.get(url)
        user = get_object_or_404(User, username="test1")
        user_profile = get_object_or_404(Profile, user=user)
        expected = get_list_or_404(user_profile.users)
        serialized = ProjectSerializer(expected, many=True)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
class  ProjectViewTest(BaseViewTest):
    
    def setUp(self):
        super().setUp()
        self.username = "test1"
        self.project_slug = "test-project-some"
        self.client.login(username="test1", password="test1test1")
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.url = reverse('view_user_project', kwargs={'username': self.username, 'project_slug': self.project_slug})
    
    def test_get_project(self):
        response = self.client.get(self.url)
        user = get_object_or_404(User, username=self.username)
        user_profile = get_object_or_404(Profile, user=user)
        projects = get_list_or_404(user_profile.users)
        serialized = None
        for project in projects:
            if self.project_slug == project.slug:
                serialized = ProjectSerializer(project)
                break
        if serialized is None:
            self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_put_project(self):
        new_data = self.dummy_project
        new_data['users'].append('test4')
        response = self.client.put(self.url, data=json.dumps(new_data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_project(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
        
        
