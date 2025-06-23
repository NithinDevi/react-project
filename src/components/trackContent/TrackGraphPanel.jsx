import React from 'react';
import { Paper, Typography } from '@mui/material';

const TrackGraphPanel = () => (
  <Paper elevation={3} sx={{ p: 2, height:'40vh' }}>
    <Typography variant="h6">Tracker Graph</Typography>
    <Typography>Graph for temperature, humidity, light, etc. will go here.</Typography>
  </Paper>
);

export default TrackGraphPanel;