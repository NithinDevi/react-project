import { Checkbox } from "@mui/material";
import React from "react";

const SectionAllSelect = ({
  onLabelClick,
  onCheckboxClick,
  indeterminate,
  isChecked,
  label,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Checkbox
        checked={isChecked}
        indeterminate={indeterminate}
        onChange={onCheckboxClick}
        sx={{
          color: "white",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      />
      <span
        style={{
          color: "white",
          marginLeft: "10px",
          fontSize: "16px",
        }}
        onClick={onLabelClick}
      >
        {" "}
        {label}
      </span>
    </div>
  );
};

export default SectionAllSelect;
