import { TableRow } from "@mui/material";
import React from "react";
import { StyledTableCell } from "../helper";
import SectionNameCheckbox from "./SectionNameCheckbox";
import RowCheckbox from "./RowCheckbox";
import {
  COUNTRIES,
  LEGS,
  PARENT_ORG,
  PRODUCE_TYPE,
  USERS,
} from "../../../pages/alert/config";

export const getRowIdKey = (sectionKey) => {
  switch (sectionKey) {
    case LEGS:
      return "GeofenceId";
    case COUNTRIES:
      return "CountryId";
    default:
      return "Id";
  }
};

const TableBodyRow = ({
  data,
  onNameClick,
  onIconClick,
  headers,
  showIcons,
  isLegTypeRows = false,
  sectionKey,
}) => {
  const rowIdKey = getRowIdKey(sectionKey);
  return data.map((row, rowIndex) => (
    <TableRow
      key={`${row[rowIdKey]}-${
        row.Name || row.CountryName || row.GeofenceName
      }-${row?.UserId || rowIndex}-${row?.ProduceName}`}
    >
      <StyledTableCell
        style={{
          padding: "8px 0px",
          width: "200px",
        }}
      >
        <SectionNameCheckbox
          label={
            isLegTypeRows
              ? row.GeofenceName
              : row.CountryName
              ? row.CountryName
              : row.Name
          }
          isChecked={row.isChecked}
          id={row.Id}
          indeterminate={!row.isChecked && row.isIndeterminate}
          onChange={() => {
            onNameClick(row[rowIdKey], row.isChecked);
          }}
        />
      </StyledTableCell>

      {showIcons &&
        headers.map((header) => (
          <StyledTableCell key={header.key} align="center">
            <RowCheckbox
              isChecked={row[header.key]}
              isDisabled={row[header.key] === null}
              onClick={() => {
                console.log("clicked_row::", row);
                onIconClick(row[rowIdKey], header.key, row[header.key]);
              }}
            />
          </StyledTableCell>
        ))}
    </TableRow>
  ));
};

export default TableBodyRow;
