from django.urls import path
from . import views

urlpatterns = [
    path('generate-plan/', views.ExampleAuthenticatedView.as_view(), name='chatbot/generate-plan'),
    path('status_check/', views.status_check, name='chatbot/status_check'),
    path('finalize-plan', views.finalize_plan, name='chatbot/finalize-plan'),
]