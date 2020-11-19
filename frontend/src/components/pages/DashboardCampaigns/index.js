import React from 'react';

import { PageTitleCampaigns } from '../../layout-components';
import CampaignsInventory from '../../components/Campaigns/CampaignsInventory';

export default function DashboardClicks() {
  return (
    <>
    <PageTitleCampaigns
        titleHeading="Campaigns"
        titleDescription="Here are all the campaigns you have created. Click on the magnifying glass to update them."
        buttonText="Campaigns Summary"
        actionMessage="Add New Campaign"
      />
      <CampaignsInventory />
    </>
  );1
}
