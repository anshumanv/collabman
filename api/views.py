from django.shortcuts import render
from rest_framework.views import APIView
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import authenticate
from .models import Profile, Project, DocType, Document, Task, Subtask, SubtaskLog
from .serializers import UserSerializer, ProfileSerializer, ProjectSerializer, DocTypeSerializer, DocumentSerializer, TaskSerializer, SubtaskSerializer, SubtaskLogSerializer
from rest_framework.authtoken.models import Token
from django.core import serializers


# Create your views here.

class UserCreate(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer


class ProfileCreate(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = ProfileSerializer

class ProfileAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        # print(user.id)
        user_profile = get_object_or_404(Profile, user=user.id)
        data = ProfileSerializer(user_profile).data
        return Response(data)
    
    def put(self, request, username):
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, id=user.id)
        serialize = ProfileSerializer(user_profile, data=request.data)
        if serialize.is_valid():
            serialize.save()
            Response(status=201)
        return Response(status=404)
    
    def delete(self, request, username):
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, id=user.id)
        user_profile.delete()
        user.delete()
        return Response(status=204)


class LoginView(APIView):
    permission_classes = ()
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            return Response({"token": user.auth_token.key })
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class LoginGithubView(APIView):
    permission_classes = ()

    def get(self, request):
        if request.user.is_authenticated:
            if len(Token.objects.filter(user=request.user)):
                token = Token.objects.filter(user=request.user)
            else:
                token = Token.objects.create(user=request.user)
            data = serializers.serialize('python', Token.objects.filter(user=request.user))
            return Response({"token": [d['pk'] for d in data], "username": request.user.username })
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

class ProjectList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        user = user.profile
        # print(user) 
        projects = Project.objects.filter(users=user) # @aashutoshrathi best
        # print(projects)
        serializer = ProjectSerializer(projects, many =True)
        return Response(serializer.data)
    
    def post(self, request, username):
        user = get_object_or_404(User, username=username)
        uid = user.profile.id
        request.data['project_manager'] = uid
        if uid not in request.data['users']:
            request.data['users'].append(uid)
        serialize = ProjectSerializer(data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)

class ProjectView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, username, project_slug):
        user = get_object_or_404(User, username=username)
        uid = user.id
        user = get_object_or_404(Profile, id=uid)
        projects = get_list_or_404(user.users)
        for project in projects:
            if project_slug == project.slug:
                serializer = ProjectSerializer(project)
                return Response(serializer.data)
        return Response(status=404)
    
    def put(self, request, username, project_slug):
        user = get_object_or_404(User, username=username)
        uid = user.id
        project = get_object_or_404(Project, slug=project_slug)
        if project.project_manager.id == uid:
            data = request.data
            serializer = ProjectSerializer(project, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=201)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response(status=404)
    
    def delete(self, request, username, project_slug):
        user = get_object_or_404(User, username=username)
        uid = user.id
        project = get_object_or_404(Project, slug=project_slug)
        if project.project_manager.id == uid:
            project.delete()
            return Response(status=204)
        else:
            return Response(status=400)
class DocTypeListView(generics.ListAPIView):

    permission_classes = (IsAuthenticated,)
    queryset = DocType.objects.all()
    serializer_class = DocTypeSerializer

    def post(self, request):
        data = request.data
        serialize = DocTypeSerializer(data=data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)

class DocTypeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, did):
        doctype = get_object_or_404(DocType, id=did)
        serialize = DocTypeSerializer(doctype)
        return Response(serialize.data, status=201)
    
    def put(self, request, did):
        doctype = get_object_or_404(DocType, id=did)
        data = request.data
        serialize = DocTypeSerializer(doctype, data=data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)
        
    def delete(self, request, did):
        doctype = get_object_or_404(DocType, id=did)
        doctype.delete()
        return Response(status=204)

class DocumentListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username, project_slug):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try :
            user = project.users.get(user=user) 
            documents = project.document_set.all()
            serialize = DocumentSerializer(documents, many=True)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def post(self, request, username, project_slug):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        request.data['project_id'] = project.id
        documents =  Document.objects.filter(project_id=project.id).order_by('-document_id')
        if len(documents) > 0:
            request.data['document_id'] = documents[0].document_id + 1
        else:
            request.data['document_id'] = 0
            
        print(request.data['document_id'])
        try:
            user = project.users.get(user=user)
            serialize = DocumentSerializer(data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response(serialize.data, status=201)
            else:
                return Response(serialize.errors, status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

class DocumentView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, username, project_slug, docid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            data = get_object_or_404(Document, project_id=pid, document_id=docid)
            serialize = DocumentSerializer(data)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)
    
    def put(self, request, username, project_slug, docid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            document = get_object_or_404(Document, project_id=pid, document_id=docid)
            data = request.data
            serialize = DocumentSerializer(document, data=data)
            if serialize.is_valid():
                serialize.save()
                return Response(status=201)
            else:
                return Response(status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def delete(self, request, username, project_slug, docid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            document = get_object_or_404(Document, project_id=pid, document_id=docid)
            document.delete()
            return Response(status=204)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

class TaskListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username, project_slug):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            tasks = project.task_set.all()
            serialize = TaskSerializer(tasks, many=True)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def post(self, request, username, project_slug):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            if user.id != project.project_manager_id:
                raise  PermissionDenied
            request.data['project_id'] = project.id
            tasks = Task.objects.filter(project_id=project.id).order_by('-task_id')
            if len(tasks) > 0:
                request.data['task_id'] = tasks[0].task_id + 1
            else:
                request.data['task_id'] = 0
            serialize = TaskSerializer(data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response(serialize.data, status=201)
            else:
                return Response(serialize.errors, status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)
        except PermissionDenied:
            return Response(status=400)

class TaskView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username, project_slug, tid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            data = get_object_or_404(Task, project_id=pid, task_id=tid)
            serialize = TaskSerializer(data)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def put(self, request, username, project_slug, tid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            if user.id != project.project_manager_id:
                raise PermissionDenied
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            data = request.data
            serialize = TaskSerializer(task, data=data)
            if serialize.is_valid():
                serialize.save()
                return Response(status=201)
            else:
                return Response(status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)
        except PermissionDenied:
            return Response(status=400)

    def delete(self, request, username, project_slug, tid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            if user.id != project.project_manager_id:
                raise PermissionDenied
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            task.delete()
            return Response(status=204)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)
        except PermissionDenied:
            return Response(status=400)

class SubtaskListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username, project_slug, tid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtasks = task.subtask_set.all()
            serialize = SubtaskSerializer(subtasks, many=True)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def post(self, request, username, project_slug, tid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            request.data['project_id'] = pid
            request.data['task_id'] = tid
            serialize = SubtaskSerializer(data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response(serialize.data, status=201)
            else:
                return Response(serialize.errors, status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

class SubtaskView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username, project_slug, tid, subid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            serialize = SubtaskSerializer(subtask)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def put(self, request, username, project_slug, tid, subid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            data = request.data
            serialize = SubtaskSerializer(subtask, data=data)
            if serialize.is_valid():
                serialize.save()
                return Response(status=201)
            else:
                return Response(status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def delete(self, request, username, project_slug, tid, subid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            subtask.delete()
            return Response(status=204)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

class SubtaskLogListView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, username, project_slug, tid, subid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            subtask_logs = subtask.subtasklog_set.all()
            serialize = SubtaskLogSerializer(subtask_logs, many=True)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def post(self, request, username, project_slug, tid, subid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            request.data['subtask_id'] = subtask.id
            serialize = SubtaskLogSerializer(data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response(serialize.data, status=201)
            else:
                return Response(serialize.errors, status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400) 


class SubtaskLogView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username, project_slug, tid, subid, sublogid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            sublog = get_object_or_404(SubtaskLog, subtask_id = subtask.id, sublog_id=sublogid)
            serialize = SubtaskLogSerializer(sublog)
            return Response(serialize.data, status=201)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def put(self, request, username, project_slug, tid, subid, sublogid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            sublog = get_object_or_404(SubtaskLog, subtask_id=subtask.id, sublog_id=sublogid)
            data = request.data
            serialize = SubtaskLogSerializer(sublog, data=data)
            if serialize.is_valid():
                serialize.save()
                return Response(status=201)
            else:
                return Response(status=400)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)

    def delete(self, request, username, project_slug, tid, subid, sublogid):
        user = get_object_or_404(User, username=username)
        project = get_object_or_404(Project, slug=project_slug)
        try:
            user = project.users.get(user=user)
            pid = project.id
            task = get_object_or_404(Task, project_id=pid, task_id=tid)
            subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
            sublog = get_object_or_404(SubtaskLog, subtask_id=subtask.id, sublog_id=sublogid)
            sublog.delete()
            return Response(status=204)
        except Profile.DoesNotExist:
            return Response(status=400)
        except Profile.MultipleObjectsReturned:
            return Response(status=400)


