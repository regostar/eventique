from django.db.models import Q
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from chatbot.models import Event

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
