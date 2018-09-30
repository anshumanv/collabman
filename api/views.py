from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Profile, Project, DocType, Document, Task, Subtask, SubtaskLog
from .serializers import UserSerializer, ProfileSerializer, ProjectSerializer, DocTypeSerializer, DocumentSerializer, TaskSerializer, SubtaskSerializer, SubtaskLogSerializer
# Create your views here.

class ProfileAPIView(APIView):
    def get(self, request, pk):
        user_profile = get_object_or_404(Profile, pk)
        data = ProfileSerializer(user_profile).data
        return Response(data)