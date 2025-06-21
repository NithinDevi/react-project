import { Alert, Box, Snackbar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";

const severityStyles = {
  success: {
    backgroundColor: "#27496d", // Blueish
    icon: <CheckCircleIcon sx={{ color: "lightgreen", paddingTop: "2px" }} />,
  },
  error: {
    backgroundColor: "#d32f2f", // Red
    icon: <ErrorIcon sx={{ color: "white", paddingTop: "2px" }} />,
  },
  warning: {
    backgroundColor: "#ed6c02", // Orange
    icon: <WarningIcon sx={{ color: "white", paddingTop: "2px" }} />,
  },
  info: {
    backgroundColor: "#0288d1", // Light Blue
    icon: <InfoIcon sx={{ color: "white", paddingTop: "2px" }} />,
  },
};

const SnackBarComp = ({ isOpen, onClose, message, severity = "success" }) => {
  const { backgroundColor, icon } =
    severityStyles[severity] || severityStyles.success;

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ top: "50px !important" }}
    >
      <Alert
        elevation={6}
        variant="filled"
        icon={false}
        sx={{
          width: "fit-content",
          backgroundColor,
          color: "white",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          px: 2,
          py: 1,
        }}
      >
        <Box display="flex" alignItems="center">
          {icon}
          <span style={{ color: "white", marginLeft: "10px" }}>{message}</span>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComp;
