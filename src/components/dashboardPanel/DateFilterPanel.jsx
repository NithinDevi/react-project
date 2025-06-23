import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const DateFilterPanel = () => (
  <Box display="flex" gap={2} alignItems="center">
    {/* Start Date */}
    <TextField
      label="Start Date"
      type="date"
      size="small"
      InputLabelProps={{ shrink: true }}
      sx={{
        maxWidth: 160,
        '& input': { padding: '8px 12px' },
      }}
    />

    {/* End Date */}
    <TextField
      label="End Date"
      type="date"
      size="small"
      InputLabelProps={{ shrink: true }}
      sx={{
        maxWidth: 160,
        '& input': { padding: '8px 12px' },
      }}
    />

    {/* Filter input */}
    <TextField
      placeholder="Filter..."
      size="small"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: 220,
        '& input': { padding: '8px 12px' },
      }}
    />
  </Box>
);

export default DateFilterPanel;
