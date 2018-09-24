from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

class Project(models.Model):
    project_id = models.CharField(max_length=100, blank=True, default='', primary_key = True)
    project_name = models.CharField(max_length=100, blank=True, default='', unique=True)
    project_description = models.TextField()
    project_link = models.URLField(unique=True)
    project_chat_link = models.URLField(unique=True)
    calendar_api_token = models.CharField(max_length=100, blank=True, default='', unique=True)
    calendar_api_key = models.CharField(max_length=100, blank=True, default='', unique=True)
    git_api_key = models.CharField(max_length=100, blank=True, default='', unique=True)
    slack_api_key = models.CharField(max_length=100, blank=True, default='', unique=True)
    users = models.ManyToManyField(User, related_name='users')
    project_manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name='project_manager')


class DocType(models.Model):
    template_link = models.URLField(primary_key = True)
    template_purpose = models.TextField()

class Documents(models.Model):
    document_id = models.CharField(max_length=100, blank=True, default='', primary_key = True)
    document_link = models.URLField(unique=True)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    template_link = models.ForeignKey(DocType, on_delete=models.CASCADE)

class Task(models.Model):
    POSSIBLE_STATUS = [('work_in_progress', 'In Progress'), ('unallocated', 'Unallocated'), ('finished','Completed'), ('not_feasible', 'Not Feasible')]
    task_id = models.CharField(max_length=100, blank=True, default='', primary_key=True)
    task_title = models.CharField(max_length=100, blank=True, default='')
    task_description = models.TextField()
    task_status = models.CharField(choices=POSSIBLE_STATUS, default='Not Allocated', max_length=100)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)

class Subtask(models.Model):
    POSSIBLE_STATUS = [('work_in_progress', 'In Progress'),('unallocated', 'Unallocated'), ('finished','Completed'),('not_feasible', 'Not Feasible')]
    subtask_id = models.CharField(max_length=100, blank=True, default='')
    subtask_title = models.CharField(max_length=100, blank=True, default='')
    subtask_description = models.TextField()
    subtask_status = models.CharField(choices=POSSIBLE_STATUS, default='Not Allocated', max_length=100)
    issue_link = models.URLField(unique=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('subtask_id', 'task_id' )


class SubtaskLog(models.Model):
    subtask_id = models.ForeignKey(Subtask, on_delete=models.CASCADE)
    assigned_user = models.ForeignKey(User, on_delete=models.CASCADE)
    subtask_deadline = models.DateField()
    work_description = models.TextField()
    is_finished = models.BooleanField()
    submission_link = models.URLField(unique=True)

    class Meta:
        unique_together = ('subtask_id', 'assigned_user', 'subtask_deadline')
