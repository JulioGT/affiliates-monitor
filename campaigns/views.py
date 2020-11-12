from .models import Campaign, Affiliate
from .serializers import CampaignSerializer, AffiliateSerializer
from rest_framework import generics, status
from rest_framework.response import Response


class CampaignListCreate(generics.ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer


class AffiliateListCreate(generics.ListCreateAPIView):
    queryset = Affiliate.objects.all()
    serializer_class = AffiliateSerializer


class CampaignRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

    def get(self, request, pk):
        """
        docstring
        """
        campaign = Campaign.objects.get(pk=pk)
        serializer = CampaignSerializer(campaign)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """
        docstring
        """
        campaign = Campaign.objects.get(pk=pk)
        serializer = CampaignSerializer(campaign, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        """
        docstring
        """
        pass