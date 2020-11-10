from django.urls import path
from . import views

urlpatterns = [
    path("api/campaign/", views.CampaignListCreate.as_view()),
]