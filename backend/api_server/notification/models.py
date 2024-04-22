
from chatbot.models import Task
from django.db import models

class Notification(models.Model):
    cloud_task_id = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    schedule_time = models.DateTimeField()
    task = models.ForeignKey(Task, related_name='notifications', on_delete=models.CASCADE)
    recipient_email = models.EmailField(max_length=254)
    subject = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.cloud_task_id
