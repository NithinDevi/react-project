import React from 'react';
import { Paper, Typography } from '@mui/material';

const LegsTable = () => (
  <Paper elevation={3} sx={{ p: 2, height : '40vh' }}>
    <Typography variant="h6">Legs Table</Typography>
    <Typography>Tabular data for each leg will be shown here.</Typography>
  </Paper>
);

export default LegsTable;
