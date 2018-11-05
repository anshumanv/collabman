from django.test import TestCase
from .models import Profile, Project, DocType, Document, Task, Subtask, SubtaskLog
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from django.contrib.auth.models import User
from rest_framework.test import force_authenticate
from .serializers import UserSerializer, ProfileSerializer, ProjectSerializer, DocTypeSerializer, DocumentSerializer, TaskSerializer, SubtaskSerializer, SubtaskLogSerializer
import json
# Model Testing

'''
class ProfileModelTest(TestCase):
    def setUp(self):
        self.username = 'ftest'
        self.password = 'test1test1'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        self.user.save()
        self.first_name = 'test'
        self.last_name = 'one'
        self.email = 'test1@gmail.com'
        self.bio = 'I am first test'
        self.location = 'LocalHost'
        self.birthday = '1990-02-22'
        self.profile = Profile(user=self.user, first_name=self.first_name,  last_name=self.last_name,
                               email=self.email, bio=self.bio, location=self.location, birth_date=self.birthday)

    def test_model_can_create_a_profile(self):
        old_count = Profile.objects.count()
        self.profile.save()
        new_count = Profile.objects.count()
        self.assertNotEqual(old_count, new_count)

''' 
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
        print('***********', url)
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
        # hit the API endpoint
        self.login_a_user(username="test_user", password="testing")
        response = self.client.get(
            reverse("profile_list")
        )
        # fetch the data from db
        expected = Profile.objects.all()
        serialized = ProfileSerializer(expected, many=True)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
