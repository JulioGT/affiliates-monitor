import React from 'react';
import { PageTitleConversions } from '../../layout-components';
import DashboardStatistics1 from '../../components/DashboardConversions/CardsSummary';
import DashboardStatistics2 from '../../components/DashboardConversions/DashboardStatistics2';
import ConversionsInventory from '../../components/Tables/ConversionsInventory';

export default function DashboardConversions() {
  return (
    <>
      <PageTitleConversions
        titleHeading="Conversions"
        titleDescription="Your Conversion statistics. Here is the status of your Conversions across all your verticals."
      />
      <DashboardStatistics1 />
      <DashboardStatistics2 />
      <ConversionsInventory />
    </>
  );
}
