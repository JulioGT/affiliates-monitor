from django.test import TestCase
from .models import Campaign

# Create your tests here.


class campaignTest(TestCase):
    def test_campaign_created(self):
        """
        it expects to craate a new campaign successfully
        """
        campaign = Campaign.objects.create(name="myCampaign")
        campaign_name = campaign.name

        self.assertEqual(str(campaign), campaign_name)
