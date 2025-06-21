import { Checkbox, Typography } from "@mui/material";
import React from "react";

const SectionHeaderCheckbox = ({
  isChecked,
  indeterminate,
  onChange,
  label,
}) => {
  return (
    <div style={{ display: "flex", marginLeft: "21px" }}>
      <Checkbox
        checked={isChecked}
        indeterminate={indeterminate}
        onChange={onChange}
        sx={{
          color: "white",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      />
      <Typography
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
          marginTop: "10.5px",
          paddingLeft: "10px",
        }}
      >
        {label}
      </Typography>
    </div>
  );
};

export default SectionHeaderCheckbox;
