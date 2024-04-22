from google.cloud import tasks_v2
from api_server.settings import PROJECT, QUEUE_ID, LOCATION, CLOUD_FUNCTION_URL
from google.protobuf import timestamp_pb2
import datetime
import json


class TaskBuilder:
    def __init__(self, url):
        self.task = {"http_request": {"http_method": "POST", "url": url}}

    def add_payload(self, payload):
        if payload:
            self.task["http_request"]["body"] = payload.encode()
        return self

    def set_schedule(self, schedule_datetime=None, in_seconds=None):
        if in_seconds:
            d = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(
                seconds=in_seconds
            )
        elif schedule_datetime:
            d = schedule_datetime
        else:
            return self

        timestamp = timestamp_pb2.Timestamp()
        timestamp.FromDatetime(d)
        self.task["schedule_time"] = timestamp
        return self

    def build(self):
        return self.task


class CloudTaskCreator:
    def __init__(self, project, queue, location):
        self.client = tasks_v2.CloudTasksClient()
        self.parent = self.client.queue_path(project, location, queue)

    def create_task(self, url, payload=None, schedule_datetime=None, in_seconds=None):
        task_builder = TaskBuilder(url)
        task_builder.add_payload(payload).set_schedule(schedule_datetime, in_seconds)
        task = task_builder.build()
        response = self.client.create_task(parent=self.parent, task=task)
        print("Task created: {}".format(response.name))


def notify(
    recipient: str,
    subject: str,
    content: str,
    schedule_datetime: datetime,
    in_seconds: int,
):
    """Utility function to be used in views which helps in notification

    Args:
        recipient (str): TO email address
        subject (str): email subject
        content (str): email content
    """

    task_creator = CloudTaskCreator(project=PROJECT, queue=QUEUE_ID, location=LOCATION)
    payload = {"recipient": recipient, "subject": subject, "content": content}
    task_creator.create_task(
        url=CLOUD_FUNCTION_URL,
        payload=json.dumps(payload),
        schedule_datetime=schedule_datetime,
        in_seconds=in_seconds,
    )
