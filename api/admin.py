from django.contrib import admin
from .models import Profile, Project, DocType, Documents, Task, Subtask, SubtaskLog

admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(DocType)
admin.site.register(Documents)
admin.site.register(Task)
admin.site.register(Subtask)
admin.site.register(SubtaskLog)
