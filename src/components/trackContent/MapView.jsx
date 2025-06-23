import React from 'react';
import { Paper, Typography } from '@mui/material';

const MapView = () => (
  <Paper elevation={3} sx={{ p: 2, height: '40vh' }}>
    <Typography variant="h6">Map View</Typography>
    <Typography>Map will be displayed here.</Typography>
  </Paper>
);

export default MapView;