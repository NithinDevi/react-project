import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

const RowCheckbox = ({ onClick, isChecked, isDisabled }) => {
  return (
    <Box
      sx={{
        width: "70px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: isDisabled ? "default" : "pointer",
      }}
      onClick={isDisabled ? () => "" : onClick}
      className="statusIcon"
    >
      {isChecked && !isDisabled ? (
        <CheckCircle sx={{ color: "green" }} />
      ) : (
        <Cancel
          sx={{
            color: isDisabled ? "grey" : "red",
          }}
        />
      )}
    </Box>
  );
};

export default RowCheckbox;
