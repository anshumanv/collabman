from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.__str__()

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
    users = models.ManyToManyField(Profile, related_name='users')
    project_manager = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='project_manager')

    def __str__(self):
        return self.project_name


class DocType(models.Model):
    template_link = models.URLField(primary_key = True)
    template_title = models.CharField(max_length=20, blank=False, default='template')
    template_purpose = models.TextField()

    def __str__(self):
        return self.template_title


class Documents(models.Model):
    document_id = models.CharField(max_length=100, blank=True, default='', primary_key = True)
    document_link = models.URLField(unique=True)
    document_title = models.CharField(max_length=20, blank=False, default='New Document')
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    template_link = models.ForeignKey(DocType, on_delete=models.CASCADE)

    def __str__(self):
        return self.document_title


class Task(models.Model):
    POSSIBLE_STATUS = [('work_in_progress', 'In Progress'), ('unallocated', 'Unallocated'), ('finished','Completed'), ('not_feasible', 'Not Feasible')]
    task_id = models.CharField(max_length=100, blank=True, default='', primary_key=True)
    task_title = models.CharField(max_length=100, blank=True, default='')
    task_description = models.TextField()
    task_status = models.CharField(choices=POSSIBLE_STATUS, default='Not Allocated', max_length=100)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.task_title


class Subtask(models.Model):
    POSSIBLE_STATUS = [('work_in_progress', 'In Progress'),('unallocated', 'Unallocated'), ('finished','Completed'),('not_feasible', 'Not Feasible')]
    subtask_id = models.CharField(max_length=100, blank=True, default='')
    subtask_title = models.CharField(max_length=100, blank=True, default='')
    subtask_description = models.TextField()
    subtask_status = models.CharField(choices=POSSIBLE_STATUS, default='Not Allocated', max_length=100)
    issue_link = models.URLField(unique=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return self.subtask_title

    class Meta:
        unique_together = ('subtask_id', 'task_id' )


class SubtaskLog(models.Model):
    subtask_id = models.ForeignKey(Subtask, on_delete=models.CASCADE)
    assigned_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    subtask_deadline = models.DateField()
    work_description = models.TextField()
    is_finished = models.BooleanField()
    submission_link = models.URLField(blank=True)

    def __str__(self):
        return self.subtask_id.__str__() + '\t' + str(self.subtask_deadline)

    class Meta:
        unique_together = ('subtask_id', 'assigned_user', 'subtask_deadline')
