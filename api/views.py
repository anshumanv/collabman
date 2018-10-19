from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import authenticate
from .models import Profile, Project, DocType, Document, Task, Subtask, SubtaskLog
from .serializers import UserSerializer, ProfileSerializer, ProjectSerializer, DocTypeSerializer, DocumentSerializer, TaskSerializer, SubtaskSerializer, SubtaskLogSerializer
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
    def get(self, request, pk):
        user_profile = get_object_or_404(Profile, id=pk)
        data = ProfileSerializer(user_profile).data
        return Response(data)
    
    def put(self, request, pk):
        user_profile = get_object_or_404(Profile, id=pk)
        serialize = ProfileSerializer(user_profile, data=request.data)
        if serialize.is_valid():
            serialize.save()
            Response(status=201)
        return Response(status=404)
    
    def delete(self, request, pk):
        user_profile = get_object_or_404(Profile, id=pk)
        user = get_object_or_404(User, id=pk)
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

class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

class ProjectList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, uid):
        user = get_object_or_404(Profile, id=uid)
        projects = get_list_or_404(user.users)
        serializer = ProjectSerializer(projects, many =True)
        return Response(serializer.data)
    
    def post(self, request, uid):
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
    def get(self, request, uid, pid):
        user = get_object_or_404(Profile, id=uid)
        projects = get_list_or_404(user.users)
        for project in projects:
            if pid == project.pk:
                serializer = ProjectSerializer(project)
                return Response(serializer.data)
        return Response(status=404)
    
    def put(self, request, uid, pid):
        project = get_object_or_404(Project, id=pid)
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
    
    def delete(self, request, uid, pid):
        project = get_object_or_404(Project, id=pid)
        if project.project_manager.id == uid:
            project.delete()
            return Response(status=204)
        
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

    def get(self, request, pid):
        project = get_object_or_404(Project, id=pid)
        documents = project.document_set.all()
        serialize = DocumentSerializer(documents, many=True)
        return Response(serialize.data, status=201)
    
    def post(self, request, pid):
        request.data['project_id'] = pid
        serialize = DocumentSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)

class DocumentView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pid, docid):
        data = get_object_or_404(Document, project_id=pid, document_id=docid)
        serialize = DocumentSerializer(data)
        return Response(serialize.data, status=201)
    
    def put(self, request, pid, docid):
        document = get_object_or_404(Document, project_id=pid, document_id=docid)
        data = request.data
        serialize = DocumentSerializer(document, data=data)
        if serialize.is_valid():
            serialize.save()
            return Response(status=201)
        else:
            return Response(status=400)
    
    def delete(self, request, pid, docid):
        document = get_object_or_404(Document, project_id=pid, document_id=docid)
        document.delete()
        return Response(status=204)

class TaskListView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pid):
        project = get_object_or_404(Project, id=pid)
        tasks = project.task_set.all()
        serialize = TaskSerializer(tasks, many=True)
        return Response(serialize.data, status=201)

    def post(self, request, pid):
        request.data['project_id'] = pid
        serialize = TaskSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)

class TaskView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pid, tid):
        data = get_object_or_404(Task, project_id=pid, task_id=tid)
        serialize = TaskSerializer(data)
        return Response(serialize.data, status=201)

    def put(self, request, pid, tid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        data = request.data
        serialize = TaskSerializer(task, data=data)
        if serialize.is_valid():
            serialize.save()
            return Response(status=201)
        else:
            return Response(status=400)

    def delete(self, request, pid, docid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        task.delete()
        return Response(status=204)

class SubtaskListView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pid, tid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtasks = task.subtask_set.all()
        serialize = SubtaskSerializer(subtasks, many=True)
        return Response(serialize.data, status=201)

    def post(self, request, pid, tid):
        request.data['project_id'] = pid
        request.data['task_id'] = tid
        serialize = SubtaskSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)

class SubtaskView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pid, tid, subid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
        serialize = SubtaskSerializer(subtask)
        return Response(serialize.data, status=201)

    def put(self, request, pid, tid, subid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
        data = request.data
        serialize = SubtaskSerializer(subtask, data=data)
        if serialize.is_valid():
            serialize.save()
            return Response(status=201)
        else:
            return Response(status=400)

    def delete(self, request, pid, tid, subid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
        subtask.delete()
        return Response(status=204)

class SubtaskLogListView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pid, tid, subid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
        subtask_logs = subtask.subtasklog_set.all()
        serialize = SubtaskLogSerializer(subtask_logs, many=True)
        return Response(serialize.data, status=201)

    def post(self, request, pid, tid, subid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
        request.data['subtask_id'] = subtask.id
        serialize = SubtaskLogSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)


class SubtaskLogView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pid, tid, subid, sublogid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
        sublog = get_object_or_404(SubtaskLog, subtask_id = subtask.id, sublog_id=sublogid)
        serialize = SubtaskLogSerializer(sublog)
        return Response(serialize.data, status=201)

    def put(self, request, pid, tid, subid, sublogid):
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

    def delete(self, request, pid, tid, subid, sublogid):
        task = get_object_or_404(Task, project_id=pid, task_id=tid)
        subtask = get_object_or_404(Subtask, task_id=task.id, subtask_id=subid)
        sublog = get_object_or_404(SubtaskLog, subtask_id=subtask.id, sublog_id=sublogid)
        sublog.delete()
        return Response(status=204)
