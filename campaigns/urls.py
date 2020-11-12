from django.urls import path
from . import views

# .retrieve(request, *args, **kwargs)
urlpatterns = [
    path("api/campaign/", views.CampaignListCreate.as_view()),
    path("api/campaign/<int:pk>", views.CampaignRetrieveUpdateAPIView.as_view()),
    path("api/affiliate/", views.AffiliateListCreate.as_view()),
]