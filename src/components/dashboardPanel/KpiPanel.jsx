import React from 'react';
import { Box, Button } from '@mui/material';

const KPIS = ['KPI 1', 'KPI 2', 'KPI 3', 'TimeOutOfTemp1', 'TimeOutOfTemp2', 'TimeOutOfTemp3'];

const KpiPanel = () => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      justifyContent="flex-start"
      sx={{ my: 2 }}
    >
      {KPIS.map((label, index) => (
        <Button
          key={index}
          variant="contained"
          sx={{
            backgroundColor: '#e0e0e0',
            color: '#000',
            fontWeight: 600,
            minWidth: 130,
            height: 50,
            borderRadius: 1,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#bdbdbd',
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default KpiPanel;
