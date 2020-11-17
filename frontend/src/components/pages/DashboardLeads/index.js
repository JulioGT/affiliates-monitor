import React from 'react';

import { PageTitleLeads } from '../../layout-components';

import DashboardStatistics1 from '../../components/DashboardLeads/CardsSummary';
import DashboardStatistics2 from '../../components/DashboardLeads/DashboardStatistics2';
import LeadsInventory from '../../components/Tables/LeadsInventory';

export default function DashboardLeads() {
  return (
    <>
      <PageTitleLeads
        titleHeading="Leads"
        titleDescription="Your leads statistics. Here is the status of your leads across all your verticals."
      />
      <DashboardStatistics1 />
      <DashboardStatistics2 />
      <LeadsInventory />
    </>
  );
}
