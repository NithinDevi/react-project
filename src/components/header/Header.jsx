import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully');
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar
      sx={{ backgroundColor: '#ffffff', width: '100%' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        {/* Left section with branding and nav link */}
        <Box display="flex" alignItems="center" gap={4}>
          <Typography
            variant="h6"
            noWrap
            sx={{ color: 'orangered', fontWeight: 'bold' }}
          >
            Escavox
          </Typography>

          <Button
            component={RouterLink}
            to="/dashboard"
            sx={{
              textTransform: 'none',
              color: '#3949ab',
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': { color: 'orangered' },
            }}
          >
            TrackInsights
          </Button>
        </Box>

        {/* Right side: dropdown menu */}
        <Box>
          <IconButton onClick={handleMenuClick} sx={{ color: 'orangered' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
