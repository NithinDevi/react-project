import React from 'react';
import { Container, Box } from '@mui/material';
import Header from '../header/Header';
import DashboardPanel from '../dashboardPanel/DashboardPanel';
import TrackContent from '../trackContent/TrackContent';
import TrackTable from '../trackTable/TrackTable';

const TrackInsights = () => {
  return (
    <div style={{height : '120vh'}}>
      <Header />

      <Box
        sx={{
          border: '15px solid rgb(14, 73, 122)',
          height : '100%',
          marginTop: '16px',               // Push the box down to create visual separation
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Container maxWidth="xl">
          <Box mt={3}>
            <DashboardPanel />
            <TrackContent />
            <TrackTable/>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default TrackInsights;
