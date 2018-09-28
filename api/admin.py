from django.contrib import admin
from .models import Profile, Project, DocType, Document, Task, Subtask, SubtaskLog

admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(DocType)
admin.site.register(Document)
admin.site.register(Task)
admin.site.register(Subtask)
admin.site.register(SubtaskLog)
