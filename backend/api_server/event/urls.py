from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.GetEventsView.as_view(), name='event/get-events'),
    path('<int:eventId>', views.SingleEventView.as_view(), name='event/single-event')
]