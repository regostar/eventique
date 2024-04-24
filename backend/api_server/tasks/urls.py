from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.get_tasks, name='tasks/get-tasks'),
    path('<int:taskId>', views.single_task, name='tasks/single-task')
]