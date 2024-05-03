from django.db import models
# from user_auth_api.models import AppUser
from django.contrib.auth import get_user_model
User = get_user_model()

# Event model
class Event(models.Model):
    prompt = models.TextField()
    description = models.TextField()
    title = models.CharField(max_length=255)
    purpose = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

# Task model
class Task(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    event = models.ForeignKey(Event, related_name='tasks', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)