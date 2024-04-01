from django.urls import path
from . import views

urlpatterns = [
    path('event/new/', views.get_event, name='get_event'),
    path('event/create/', views.create_event, name='create_event'),
]