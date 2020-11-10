from django.test import TestCase

# Create your tests here.

class campaignTest (TestCase):
  def test_campaign_created(self):
    """
    it expects to craate a new campaign successfully
    """
    campaign = Campaign.objects.create(name='myCampaign')
    campaign_name = Campaign.name

    self.assertEqual(str(campaign), campaign_name) 


 
