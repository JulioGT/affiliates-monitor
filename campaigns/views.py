from .models import Campaign
from .serializers import CampaignSerializer
from rest_framework import generics


class CampaignListCreate(generics.ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
