import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const SectionNameCheckbox = ({
  isChecked,
  indeterminate,
  onChange,
  label,
  id,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          className="checkbox"
          checked={isChecked}
          indeterminate={indeterminate}
          onChange={onChange}
        />
      }
      label={
        <span style={{ fontSize: "14px" }} className="labelName">
          {label}
        </span>
      }
      sx={{ margin: 0, marginRight: 1 }}
    />
  );
};

export default SectionNameCheckbox;
