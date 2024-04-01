from django.shortcuts import render
import json

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils.dateparse import parse_datetime
from .models import Event
from api_server.settings import model



@require_http_methods(["GET"])
def get_event(request):
    try:
        prompt = request.GET.get('prompt')
        # start_time = request.GET.get('start_time')  # Optional
        # end_time = request.GET.get('end_time')  # Optional

        formatter_llm = " Add date and time for each task of this event "

        response = model.generate_content(prompt + formatter_llm)
        print(response.text)

        return JsonResponse({'response': response.text}, status=201)

    except Exception as e:
        print("Error - ", str(e))
        return JsonResponse({'error': str(e)}, status=500)


@require_http_methods(["POST"])
def create_event(request):
    try:
        print("came here")
        # Assuming the request body is in JSON format
        data = json.loads(request.body)
        prompt = data['prompt']
        description = data['description']
        start_time = data.get('start_time')  # Optional
        end_time = data.get('end_time')  # Optional

        # Convert string datetime to Python datetime object if not None
        if start_time:
            start_time = parse_datetime(start_time)
        if end_time:
            end_time = parse_datetime(end_time)

        # Create and save the new event
        # get user_id from request and then save
        event = Event(prompt=prompt, description=description, start_time=start_time, end_time=end_time, user_id=1)
        event.save()

        return JsonResponse({'message': 'Event created successfully', 'id': event.id}, status=201)

    except Exception as e:
        print(str(e))
        return JsonResponse({'error': str(e)}, status=500)
