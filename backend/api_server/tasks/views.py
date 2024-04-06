from django.db.models import Q
from datetime import datetime
from django.http import JsonResponse
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
