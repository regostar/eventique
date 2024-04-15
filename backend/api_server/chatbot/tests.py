from django.test import TestCase
from django.test import TestCase, Client
from django.urls import reverse


class EventTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('create_event')
        self.valid_data = {
            'prompt': 'Test Event',
            'description': 'This is a test description.'
        }

    def test_generate_plan(self):
        response = self.client.get('/api/chatbot/generate-plan/', follow=True)
        # without variable prompt
        self.assertEqual(response.status_code, 500)

    # def test_accept_plan(self):
    #     response = self.client.post('/api/chatbot/accept-plan', follow=True)
    #     self.assertEqual(response.status_code, 201)

    # def test_create_event_with_dates(self):
    #     data_with_dates = self.valid_data.copy()
    #     data_with_dates['start_time'] = '2023-01-01T12:00:00Z'
    #     data_with_dates['end_time'] = '2023-01-02T12:00:00Z'
        
    #     response = self.client.post(self.url, data_with_dates, content_type='application/json')
    #     self.assertEqual(response.status_code, 201)
    #     self.assertIn('Event created successfully', response.json()['message'])
    