from django.test import TestCase

class EventTestCase(TestCase):
    def setUp(self):
        pass
        # prereq obj creation here

    def test_get_event(self):
        response = self.client.get('/homepage/event/create/?prompt=birthday', follow=True)
        self.assertEqual(response.status_code, 201)