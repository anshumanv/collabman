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


class LoginView(APIView):
    permission_classes = ()

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            return Response({"token": user.auth_token.key})
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

class ProjectView(APIView):
    def get(self, request, uid, pid):
        user = get_object_or_404(Profile, id=uid)
        projects = get_list_or_404(user.users)
        for project in projects:
            if pid == project.pk:
                serializer = ProjectSerializer(project)
                return Response(serializer.data)
        return Response(status=404)
    
    def post(self, request, uid, pid):
        project = get_object_or_404(Project, project_id=pid)
        if project.project_manager.id == uid:
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                print(serializer.data)
                serializer.save()
                print('Everything is fine till now')
                return Response(serializer.data)
        else:
            return Response(status=404)


