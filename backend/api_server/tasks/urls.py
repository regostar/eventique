from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.GetTasksView.as_view(), name='tasks/get-tasks'),
    path('<int:taskId>', views.SingleTaskView.as_view(), name='tasks/single-task')
]