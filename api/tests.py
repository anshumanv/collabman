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
    def create_user(username, password, first_name, last_name, email):
        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        return user

    def create_profile(self, username, password, first_name, last_name, email):
        user = self.create_user(username, password, first_name, last_name, email)

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
        self.create_profile("test4", "test4test4", "test",
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
        self.dummy_doctype = {
            "template_link": "https://web.telegram.org/",
            "template_title": "test_template",
            "template_purpose" : "To test views"
        }
        
        self.dummy_document = {
            "document_link": "http://doc29.com",
            "document_title": "New Document-II",
            "project_id": 1,
            "template_link": 5
        }

        self.dummy_task = {
            "task_title": "Task 1",
            "task_description": "This is task one",
            "task_status": "work_in_progress",
            "project_id": 1
        }
        self.dummy_subtask = {
            "subtask_id": 1,
            "subtask_title": "Subtask 001",
            "subtask_description": "First subtask Hurray",
            "subtask_status": "unallocated",
            "issue_link": "http://task1.com"
        }
        self.dummy_subtasklog = {
            "sublog_id": 1,
            "subtask_deadline": "2018-11-03",
            "work_description": "Some Work",
            "is_finished": False,
            "submission_link": "",
            "subtask_id": 1,
            "assigned_user": 1
        }

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
        self.client.login(username="test1", password="test1test1")
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()
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

class DocTypeViewListTest(BaseViewTest):
    def setUp(self):
        super().setUp()
        self.client.login(username="test1", password="test1test1")
        self.url = reverse('checkout_all_doc_type')
    
    def test_doc_type(self):
        data = self.dummy_doctype
        response = self.client.post(self.url, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(self.url)
        expected = DocType.objects.all()
        serialized = DocTypeSerializer(expected, many=True)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class DocTypeTest(BaseViewTest):
    

    def setUp(self):
        super().setUp()
        data = self.dummy_doctype
        self.client.login(username="test1", password="test1test1")
        self.url = reverse('checkout_all_doc_type')
        response = self.client.post(self.url, json.dumps(data),content_type="application/json")
        self.did = response.data['id']
        self.url = reverse('checkout_doc_type', kwargs={'did' : self.did})
    
    def test_get_doc_type(self):
        response = self.client.get(self.url)
        expected = get_object_or_404(DocType, id=self.did)
        serialize = DocTypeSerializer(expected)
        self.assertEqual(response.data, serialize.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
        
    def test_put_doc_type(self):
        data = self.dummy_doctype
        data['template_title'] = "Let's change this"
        response = self.client.put(self.url, data=json.dumps(data), content_type="application/json")
        self.client.logout()
    
    def test_delete_doc_type(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

class DocumentListTest(BaseViewTest):
    def setUp(self):
        super().setUp()
        self.client.login(username="test1", password="test1test1")
        self.username = "test1"
        self.project_slug = "test-project-some"
        # Project setup
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        self.client.post(url, data=json.dumps(data), content_type="application/json")
        # Doctype Setup
        url = reverse('checkout_all_doc_type')
        self.client.post(url, data=json.dumps(data), content_type="application/json")
        data = self.dummy_doctype
        response = self.client.post(url, json.dumps(data), content_type="application/json")
        self.url = reverse('documents_list', kwargs={'username': self.username, 'project_slug': self.project_slug})
        
    def test_documents_list(self):
        data = self.dummy_document
        response = self.client.post(self.url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(self.url)
        user = get_object_or_404(User, username=self.username)
        user_profile = get_object_or_404(Profile, user=user)
        project = get_object_or_404(Project, slug=self.project_slug)
        user_profile = project.users.get(id=user_profile.id)
        documents = project.document_set.all()
        serialize = DocumentSerializer(documents, many=True)
        self.assertEqual(response.data, serialize.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DocumentTest(BaseViewTest):

    def setUp(self):
        super().setUp()
        self.client.login(username="test1", password="test1test1")
        self.username = "test1"
        self.project_slug = "test-project-some"
        self.docid = 1
        # Project setup
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.pid = response.data['id']
        # Doctype Setup
        url = reverse('checkout_all_doc_type')
        self.client.post(url, data=json.dumps(data), content_type="application/json")
        data = self.dummy_doctype
        response = self.client.post(url, json.dumps(data), content_type="application/json")
        self.template_link = response.data["id"]
        #Document Setup
        data = self.dummy_document
        data['project_id'] = self.pid
        data['template_link'] = self.template_link
        url = reverse('documents_list', kwargs={'username': self.username, 'project_slug': self.project_slug})
        resp = self.client.post(url, data=json.dumps(data), content_type="application/json")
        ## URL
        self.url = reverse('documents_view', kwargs={'username': self.username, 'project_slug': self.project_slug, 'docid' : self.docid})
        

    def test_get_document(self):
        response = self.client.get(self.url)
        pid = project = get_object_or_404(Project, slug=self.project_slug).id
        expected = get_object_or_404(Document, project_id=pid, document_id=self.docid)
        serialize = DocumentSerializer(expected)
        self.assertEqual(response.data, serialize.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_put_document(self):
        data = self.dummy_document
        data['document_title'] = "Let's change this"
        data['document_id'] = self.docid
        response = self.client.put(self.url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_delete_document(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()


class TaskListTest(BaseViewTest):
    def setUp(self):
        super().setUp()
        self.client.login(username="test1", password="test1test1")
        self.username = "test1"
        self.project_slug = "test-project-some"
        # Project setup
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        self.client.post(url, data=json.dumps(data), content_type="application/json")
        ## url
        self.url = reverse('task_list', kwargs={'username': self.username, 'project_slug': self.project_slug})

    def test_task_list(self):
        data = self.dummy_task
        response = self.client.post(self.url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(self.url)
        user = get_object_or_404(User, username=self.username)
        user_profile = get_object_or_404(Profile, user=user)
        project = get_object_or_404(Project, slug=self.project_slug)
        user_profile = project.users.get(id=user_profile.id)
        tasks = project.task_set.all()
        serialize = TaskSerializer(tasks, many=True)
        self.assertEqual(response.data, serialize.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TaskTest(BaseViewTest):

    def setUp(self):
        super().setUp()
        self.client.login(username="test1", password="test1test1")
        self.username = "test1"
        self.project_slug = "test-project-some"
        self.tid = 1
        # Project setup
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.pid = response.data['id']
        ## print(response.data)
        # Task Setup
        url = reverse('task_list', kwargs={'username': self.username, 'project_slug': self.project_slug})
        data = self.dummy_task
        data['project_id'] = self.pid
        data['task_id'] = 1
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        ## URL
        self.url = reverse('task_view', kwargs={'username': self.username, 'project_slug': self.project_slug, 'tid': self.tid})

    def test_get_task(self):
        response = self.client.get(self.url)
        pid = get_object_or_404(Project, slug=self.project_slug).id
        expected = get_object_or_404(Task, project_id=pid, task_id=self.tid)
        serialize = TaskSerializer(expected)
        self.assertEqual(response.data, serialize.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_put_task(self):
        data = self.dummy_task
        data['task_title'] = "Let's change this"
        data['task_id'] = self.tid
        data['project_id'] = self.pid
        response = self.client.put(self.url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_delete_task(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

class SubtaskListTest(BaseViewTest):
    def setUp(self):
        super().setUp()
        self.client.login(username="test1", password="test1test1")
        self.username = "test1"
        self.project_slug = "test-project-some"
        self.tid = 1
        # Project setup
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.pid = response.data['id']
        # Task Setup
        url = reverse('task_list', kwargs={'username': self.username, 'project_slug': self.project_slug})
        data = self.dummy_task
        data['project_id'] =  self.pid
        data['task_id'] = self.tid
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        ## URL
        self.url = reverse('subtask_list_view', kwargs={'username': self.username, 'project_slug': self.project_slug, 'tid': self.tid})

    def test_subtask_list(self):
        data = self.dummy_subtask
        response = self.client.post(self.url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(self.url)
        user = get_object_or_404(User, username=self.username)
        user_profile = get_object_or_404(Profile, user=user)
        project = get_object_or_404(Project, slug=self.project_slug)
        user_profile = project.users.get(id=user_profile.id)
        task = get_object_or_404(Task, project_id=project.id, task_id=self.tid)
        subtasks = task.subtask_set.all()
        serialize = SubtaskSerializer(subtasks, many=True)
        self.assertEqual(response.data, serialize.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class SubtaskTest(BaseViewTest):

    def setUp(self):
        super().setUp()
        self.client.login(username="test1", password="test1test1")
        self.username = "test1"
        self.project_slug = "test-project-some"
        self.tid = 1
        self.subid =  1
        # Project setup
        url = reverse('view_user_projects', kwargs={'username': 'test1'})
        data = self.dummy_project
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.pid = response.data['id']
        # Task Setup
        url = reverse('task_list', kwargs={'username': self.username, 'project_slug': self.project_slug})
        data = self.dummy_task
        data['project_id'] = self.pid
        data['task_id'] = self.tid
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        # Subtask Setup
        url = reverse('subtask_list_view', kwargs={'username': self.username, 'project_slug': self.project_slug, 'tid': self.tid})
        data = self.dummy_subtask
        response = self.client.post(url, data=json.dumps(data), content_type="application/json")
        self.subid = 1
        ## URL
        self.url = reverse('subtask_view', kwargs={'username': self.username, 'project_slug': self.project_slug, 'tid': self.tid, 'subid':self.subid})

    def test_get_subtask(self):
        response = self.client.get(self.url)
        task = get_object_or_404(Task, project_id=self.pid, task_id=self.tid)
        expected = get_object_or_404(Subtask, task_id=task.id, subtask_id=self.subid)
        serialize = SubtaskSerializer(expected)
        self.assertEqual(response.data, serialize.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_put_subtask(self):
        data = self.dummy_subtask
        data['subtask_title'] = "Let's change this"
        response = self.client.put(self.url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_delete_subtask(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
