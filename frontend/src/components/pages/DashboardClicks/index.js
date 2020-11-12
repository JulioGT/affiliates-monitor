import React from 'react';

import { PageTitleClicks } from '../../layout-components';

import DashboardStatistics1 from '../../components/DashboardClicks/CardsSummary';
import DashboardStatistics2 from '../../components/DashboardClicks/DashboardStatistics2';
import Campaigns from '../../components/Tables/Campaigns';
import ClicksInventory from '../../components/Tables/ClicksInventory';

export default function DashboardClicks() {
  return (
    <>
      <PageTitleClicks
        titleHeading="Clicks"
        titleDescription="Your click statistics. Here is the status of your click events across all your verticals."
      />
      <DashboardStatistics1 />
      <DashboardStatistics2 />
      <ClicksInventory />
      <Campaigns />
    </>
  );
}
