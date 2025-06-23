import React from 'react';
import { Box, Grid } from '@mui/material';
import DateFilterPanel from './DateFilterPanel';
import KpiPanel from './KpiPanel';

const DashboardPanel = () => {
  return (
    <Box my={3} sx={{position : 'relative', top : '10vh'}}>
      <Grid container spacing={2} alignItems="flex-start">
        {/* Left side: Date filter (30%) */}
        <Grid item xs={12} md={4} lg={3}>
          <DateFilterPanel />
        </Grid>

        {/* Right side: KPI Panel (70%) */}
        <Grid item xs={12} md={8} lg={9}>
          <KpiPanel />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPanel;
