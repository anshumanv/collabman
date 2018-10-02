from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
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

class ProjectList(APIView):
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
    def get(self, request, pid):
        project = get_object_or_404(Project, id=pid)
        documents = project.document_set.all()
        serialize = DocumentSerializer(documents, many=True)
        return Response(serialize.data, status=201)
    
    def post(self, request, pid):
        request.data['project_id'] = pid
        serialize = DocumentSerializer(data=request.data)
        if serialize.is_valid():
            return Response(serialize.data, status=201)
        else:
            return Response(serialize.errors, status=400)

class DocumentView(APIView):
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
