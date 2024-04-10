from django.urls import path
from . import views

urlpatterns = [
    path('generate-plan/', views.generate_plan, name='chatbot/generate-plan'),
    # path('accept-plan/', views.accept_plan, name='chatbot/accept-plan'),
]