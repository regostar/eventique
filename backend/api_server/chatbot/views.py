import json

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils.dateparse import parse_datetime
from .models import Event, Task
from django.contrib.auth.decorators import login_required
from notification.utils import notify
from api_server.settings import model, MAX_OUTPUT_TOKENS
from datetime import datetime

@require_http_methods(["GET"])
def status_check(request):
    return JsonResponse({'success': True}, status=200)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ExampleAuthenticatedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        return Response(data={'message': f'Hello, {request.user.username}'})

        
# @login_required
@require_http_methods(["GET"])
def generate_plan(request):
    """
    prompt
    history - json
      history: [
        {
            role: "user",  //inputed by user
            parts: "I want you to act like a Regular Show Character",
        },
        {
            role: "model",  // outputed by LLM in response to the previous user input
            parts: "Okay",
        }]
    """
    try:
        print("!")
        print("user =", request.user)
        print("!")
        prompt = request.GET.get('prompt')
        reprompt = request.GET.get('reprompt', False)
        # if true, history should be there
        history = request.GET.get('history', [])
        
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

            The Output format is in strict JSON: 
            validate JSON in the following format without triple backticks or written text outside json
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
        if reprompt:
            updated_prompt += "Do it differently"
        retry_ctr = 10
        while(retry_ctr > 0):
            try:
                text_response = []
                chat = model.start_chat(
                        history=history,
                        # "generationConfig": {
                        #     "maxOutputTokens": MAX_OUTPUT_TOKENS,
                        # },
                        )
                responses = chat.send_message(updated_prompt, stream=False)
                # response = model.generate_content(updated_prompt)
                for chunk in responses:
                    text_response.append(chunk.text)
                plan = text_response[-1].replace('```','').replace('json','').strip()
                plan = json.loads(plan)
                break
            except Exception as e:
                if "Extra data" in str(e) or "Expecting value" in str(e):
                    retry_ctr -= 1
                else:
                    raise e

        return JsonResponse({'event': plan}, status=200)

    except Exception as e:
        print("Error - ", str(e))
        return JsonResponse({'error': str(e)}, status=500)



@require_http_methods(["POST"])
def finalize_plan(request):
    """This function is used to finalize a Plan for an Event.
    User clicks on finalize to approve the plan.
    The plan is saved and entry is created in database.
    prompt containing the chat history is preserved.

    Args:
        request (_type_): should contain the event json and prompt

    Returns:
        json: success = true or false
    """
    try:
        data = json.loads(request.body)
        print("\n", data.get('start'))
        
        # Create the Event
        event = Event.objects.create(
            title=data.get('title', None),
            purpose=data.get('purpose', None),
            prompt=data.get('prompt', None),
            start_time=data.get('start', None),
            end_time=data.get('end', None),
            user_id=data.get('userId',None)
        )
        event.save()
        print("\nEvent saved!!\n")
        # Create the Tasks
        tasks_data = data.get('tasks', [])
        for task_data in tasks_data:
            Task(
                event=event,
                title=task_data.get('title', None),
                description=task_data.get('description', None),
                start_time=task_data.get('start', None),
                end_time=task_data.get('end', None),
            ).save()
        # instant notify that event creation is successful
        notify(
            recipient="regostar006@gmail.com",
            subject=data.get('title', None),
            content=data.get('title', None) + " Is scheduled for " + data.get('start', None),
        )
        
        start_datetime = data.get('start', None)
        if start_datetime:
            try:
                schedule_datetime = datetime.fromisoformat(start_datetime)
                # schedule notification on start date
                notify(
                    recipient="regostar006@gmail.com",
                    subject=data.get('title', None),
                    content=data.get('title', None) + " Is scheduled for " + data.get('start', None),
                    schedule_datetime=schedule_datetime
                )
            except Exception as e:
                print("No schedule created, "+str(e))
        return JsonResponse({"success": True, "message": "Event and tasks saved successfully."}, status=201)
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)

