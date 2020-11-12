from rest_framework import serializers
from .models import Campaign, Affiliate


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ("id", "name", "affiliate")


class AffiliateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Affiliate
        fields = ("id", "name")