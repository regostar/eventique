import json
from django.db.models import Q
from datetime import datetime
from django.http import JsonResponse
from rest_framework.response import Response
from django.views.decorators.http import require_http_methods

from chatbot.models import Task

@require_http_methods(["GET"])
def get_tasks(request):
    try:
        start = request.GET.get('start_time')
        end = request.GET.get('end_time')

        start = datetime.fromisoformat(start)
        end = datetime.fromisoformat(end)

        query = Q(start_time__lte = end) & Q(end_time__gte = start)

        tasksQuerySet = Task.objects.filter(query)
        tasks = []
        for task in tasksQuerySet:
            jsonTask = {
                'id': task.id,
                'title': task.title,
                'start': task.start_time,
                'end': task.end_time,
                'description': task.description,
                'event_id': task.event.id
            }
            tasks.append(jsonTask)

        return JsonResponse({'tasks': tasks}, status=200)
    except Exception as e:
        print("Error - ", str(e))
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET", "PATCH"])
def single_task(request, taskId=None):
    try:
        task_obj = Task.objects.get(pk=taskId)
    except Task.DoesNotExist:
        return JsonResponse({'error': "No valid Task found"}, status=404)
    
    # Inner utility function 
    def prepareResponseTask():
        return {
            "title": task_obj.title,
            "start": task_obj.start_time,
            "description": task_obj.description,
            "end": task_obj.end_time,
            "event": {
                "id": task_obj.event.pk,
                "title": task_obj.event.title
                },
            }
    try:
        if request.method == 'GET':
            return JsonResponse(prepareResponseTask(), status=200)
        
        elif request.method == 'PATCH':
            data = json.loads(request.body)
            print(data.keys())
            task_obj.title = data['title']
            task_obj.description = data['description']
            task_obj.start_time = data['start']
            task_obj.end_time = data['end']

            task_obj.save()
            return JsonResponse(prepareResponseTask(), status=200)

    except Exception as e:
        print("Error - ", str(e))
        return JsonResponse({'error': str(e)}, status=500)