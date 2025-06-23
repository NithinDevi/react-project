import React from 'react';
import { Grid } from '@mui/material';
import MapView from './MapView';
import TrackGraphPanel from './TrackGraphPanel';
import LegsTable from './LegsTable';

const TrackContent = () => (
  <Grid container spacing={2} sx={{position:'relative', top:'10vh'}}>
    <Grid item xs={12} md={5}>
      <MapView />
    </Grid>
    <Grid item xs={12} md={4}>
      <TrackGraphPanel />
    </Grid>
    <Grid item xs={12} md={3}>
      <LegsTable />
    </Grid>
  </Grid>
);

export default TrackContent;
