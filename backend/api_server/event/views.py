from django.db.models import Q
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from chatbot.models import Event, Task

@require_http_methods(["GET"])
def get_events(request):
    try:
        start = request.GET.get('start_time', None)
        end = request.GET.get('end_time', None)
        if  start and end:
                
            start = datetime.fromisoformat(start)
            end = datetime.fromisoformat(end)

            query = Q(start_time__lte = end) & Q(end_time__gte = start)

            eventQuerySet = Event.objects.filter(query)
        else:
            eventQuerySet = Event.objects.all()
        events = []
        for event in eventQuerySet:
            jsonEvent = {
                'id': event.id,
                'title': event.title,
                'start': event.start_time,
                'end': event.end_time,
                'description': event.description,
            }
            events.append(jsonEvent)    

        return JsonResponse({'events': events}, status=200)
    except Exception as e:
        print("Error - ", str(e))
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
def single_event(request, eventId=None):
    try:
        event_obj = Event.objects.get(pk=eventId)
    except Event.DoesNotExist:
        return JsonResponse({'error': "No valid Event found"}, status=404)
    
    try:
        if request.method == 'GET':
            jsonEvent = {
                'id': event_obj.id,
                'title': event_obj.title,
                'start': event_obj.start_time,
                'end': event_obj.end_time,
                'description': event_obj.description,
                'tasks': []
            }
            query = Q(event_id = eventId)
            taskQuerySet = Task.objects.filter(query)

            def prepareResponseTask(task):
                return {
                    "title": task.title,
                    "start": task.start_time,
                    "description": task.description,
                    "end": task.end_time,
                }
            
            for task in taskQuerySet:
                jsonEvent['tasks'].append(prepareResponseTask(task))

            return JsonResponse(jsonEvent, status=200)
    
    except Exception as e:
        print("Error - ", str(e))
        return JsonResponse({'error': str(e)}, status=500)
        

