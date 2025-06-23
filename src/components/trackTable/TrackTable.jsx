import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';

const dummyData = [
  {
    serialNum: 'SN001',
    battery: '85%',
    trackID: 'TRK001',
    trackStatus: 'Active',
    currentLocation: 'Sydney',
    buttonPress: 'Yes',
    moving: 'No',
    temp: '22°C',
    redAlertCount: 1,
    lastConnected: '2024-06-20',
    daysSinceReported: 2,
    allocatedTo: 'John Doe',
    dateAllocatedToYou: '2024-06-18',
    allocatedProduce: 'Tomatoes',
    locationAccuracy: 'High',
    simpleRate: '15 min',
    uploadRate: '30 min',
    idleRate: '1 hr',
    daysSinceStart: 10,
    parentOrg: 'Escavox Org',
  },
  {
    serialNum: 'SN002',
    battery: '90%',
    trackID: 'TRK002',
    trackStatus: 'Inactive',
    currentLocation: 'Melbourne',
    buttonPress: 'No',
    moving: 'Yes',
    temp: '18°C',
    redAlertCount: 0,
    lastConnected: '2024-06-19',
    daysSinceReported: 3,
    allocatedTo: 'Jane Smith',
    dateAllocatedToYou: '2024-06-17',
    allocatedProduce: 'Avocados',
    locationAccuracy: 'Medium',
    simpleRate: '20 min',
    uploadRate: '40 min',
    idleRate: '2 hr',
    daysSinceStart: 15,
    parentOrg: 'Escavox Org',
  },
  {
    serialNum: 'SN003',
    battery: '75%',
    trackID: 'TRK003',
    trackStatus: 'Pending',
    currentLocation: 'Brisbane',
    buttonPress: 'Yes',
    moving: 'No',
    temp: '25°C',
    redAlertCount: 3,
    lastConnected: '2024-06-21',
    daysSinceReported: 1,
    allocatedTo: 'Emily Clark',
    dateAllocatedToYou: '2024-06-19',
    allocatedProduce: 'Grapes',
    locationAccuracy: 'Low',
    simpleRate: '10 min',
    uploadRate: '20 min',
    idleRate: '3 hr',
    daysSinceStart: 5,
    parentOrg: 'Escavox Org',
  },
];

const TrackTable = () => (
  <TableContainer component={Paper} sx={{ width: '100%' , position : 'relative', top:'15vh'}}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Select</TableCell>
          {Object.keys(dummyData[0]).map((key) => (
            <TableCell key={key} sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
              {key.replace(/([A-Z])/g, ' $1')}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dummyData.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell><Checkbox /></TableCell>
            {Object.values(row).map((val, i) => (
              <TableCell key={i} sx={{ whiteSpace: 'nowrap' }}>{val}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TrackTable;