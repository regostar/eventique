import json

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils.dateparse import parse_datetime
from .models import Event
from api_server.settings import model

@require_http_methods(["GET"])
def generate_plan(request):
    try:
        prompt = request.GET.get('prompt')
        
        updated_prompt = f"""
            Role: you are an event planner who creates most important tasks using event description.
            
            Context: event detail has been provided within triple backticks ```{prompt}```"""+"""

            Do the following Tasks
            1. Extract event purpose and title
            2. Extract date of event start and end if possible
            3. List various tasks related to planning this event
            4. Make tasks granular and arrange them in a sequence
            5. remove trivial tasks, such as welcoming guests, enjoying party, cleaning mess after party
            6. Detail each task by providing title, description, start datetime and end datetime
            7. perform budgeting if required

            Output format: 
            valid JSON in the following format without triple backticks or written text outside json
            {
                'title': '<Event title>',
                'purpose': <Event purpose>,
                'start': <Event start time>,
                'end': <Event end time>,
                'tasks': [
                    {
                        'title': <Task title>,
                        'description': <Task Description>,
                        'start': <Task start time>,
                        'end': <Task end time>
                    },
                    {
                        ...
                    }
                ]
            }
            """

        response = model.generate_content(updated_prompt)
        plan = response.text.replace('```','').replace('json','').strip()

        plan = json.loads(plan)

        return JsonResponse({'event': plan}, status=200)

    except Exception as e:
        print("Error - ", str(e))
        return JsonResponse({'error': str(e)}, status=500)

"""
@require_http_methods(["POST"])
def accept_plan(request):
    try:
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
"""