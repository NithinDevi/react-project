import { Collapse, TableContainer, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSectionExpand } from "../../store/reducers/alertSlice";
import ExpandedTable from "./container/ExpandedTable";
import SectionAllSelect from "./container/SectionAllSelect";
import SectionHeaderCheckbox from "./container/SectionHeaderCheckbox";
import {
  getColumnCheckboxState,
  getDataAPICallBySectionType,
  getHeaderSelectAction,
  getSelectAllAction,
  headerBackgroundColor,
  StyledTableCell,
  updateSelectedRowsbySectionWise,
} from "./helper";
import "./style.css";
import { LEGS } from "../../pages/alert/config";
import { fetchLegsGeofenceApi } from "../../store/thunk/alertThunks";
import { useContextProvider } from "../../context";

function TableLayout({ sectionTitle, headers, sectionKey, apiKey }) {
  const dispatch = useDispatch();
  const { showSnackBarMessage } = useContextProvider();
  const expandedSections = useSelector((state) => state.alert.expandedSections);

  const expanded = expandedSections[sectionKey];

  const { rows, isLoading, isAllChecked, isIndeterminate } = useSelector(
    (state) => state[sectionKey]
  );

  const selectedData = useSelector((state) => state[apiKey].selectedRows);
  const selectededProduceTypeData = useSelector(
    (state) => state.produceType.selectedRows
  );

  const handleSectionClick = () => {
    dispatch(toggleSectionExpand({ sectionKey }));
    // dispatch(
    //   updateSelectedRowsbySectionWise(sectionKey)({
    //     ids: rows.filter((row) => row.isChecked || row.isIndeterminate),
    //   })
    // );
    console.log(
      "row_data::",
      rows.filter((row) => row.isChecked || row.isIndeterminate)
    );
    // If there is no selected data in previous section we are avoiding api call
    if (selectedData.length === 0) return;
    let payload;

    if (sectionKey === LEGS) {
      payload = {
        userIds: selectedData.map((row) => row.Id),
        produceIds: selectededProduceTypeData.map((row) => row.Id),
      };
    } else {
      payload = selectedData.map((row) => row.Id);
    }
    dispatch(getDataAPICallBySectionType(sectionKey)(payload));
  };

  const handleLegNameClick = (legTypeId) => {
    dispatch(
      fetchLegsGeofenceApi({
        legTypeIds: [legTypeId],
        userIds: selectedData.map((row) => row.Id),
        produceIds: selectededProduceTypeData.map((row) => row.Id),
      })
    );
  };

  const handleHeaderSelect = (key, isChecked) => {
    dispatch(getHeaderSelectAction(sectionKey)({ headerKey: key, isChecked }));
  };

  const handleSectionAllSelect = (isChecked) => {
    if (rows.length > 0) {
      dispatch(getSelectAllAction(sectionKey)({ isChecked }));
    } else {
      showSnackBarMessage("Data is empty, please check!", "error");
    }
  };

  return (
    <div className={`table-layout ${sectionTitle}`}>
      <TableContainer
        sx={{ width: "100%", marginBottom: "4px", cursor: "pointer" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{
                  padding: "8px 0px",
                  width: "200px",
                  backgroundColor: headerBackgroundColor(sectionTitle),
                }}
              >
                <SectionAllSelect
                  label={sectionTitle}
                  isChecked={isAllChecked}
                  indeterminate={!isAllChecked && isIndeterminate}
                  onCheckboxClick={(e) => {
                    e.stopPropagation();
                    handleSectionAllSelect(e.target.checked);
                  }}
                  onLabelClick={handleSectionClick}
                />
              </StyledTableCell>
              {/* Header names */}
              {expanded &&
                headers.map((header, colIndex) => {
                  const { checked, indeterminate } = getColumnCheckboxState(
                    rows,
                    header.key,
                    sectionKey
                  );
                  return (
                    <StyledTableCell
                      key={colIndex}
                      align="center"
                      style={{
                        padding: "8px 0px",
                        backgroundColor: headerBackgroundColor(sectionTitle),
                      }}
                    >
                      <SectionHeaderCheckbox
                        label={header.label}
                        isChecked={checked}
                        indeterminate={indeterminate}
                        onChange={(e) =>
                          handleHeaderSelect(header.key, e.target.checked)
                        }
                      />
                    </StyledTableCell>
                  );
                })}
            </TableRow>
          </TableHead>
        </Table>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{ height: "400px", overflow: "auto" }}
        >
          {isLoading ? (
            <h3>Loading...</h3>
          ) : rows.length > 0 ? (
            <ExpandedTable
              data={rows}
              sectionKey={sectionKey}
              handleLegNameClick={handleLegNameClick}
              headers={headers}
            />
          ) : (
            <h3>No Data</h3>
          )}
        </Collapse>
      </TableContainer>
    </div>
  );
}

export default TableLayout;

// const expanded = useSelector(
//   (state) => state.alert.expandedSections[sectionTitle] || false
// );

// const existingRowIcons = useSelector(
//   (state) => state.alert.rowIcons[sectionTitle]
// );
// const formattedRows = useSelector((state) =>
//   getFormattedRowData(state, sectionTitle, HEADERS)
// );

// const [updatedOnce, setUpdatedOnce] = useState(false);

// const mapRowCheckedToHeaders = (rowChecked, headers) => {
//   return Object.keys(rowChecked || []).reduce((result, section) => {
//     const sectionData = rowChecked[section];
//     const mappedData = sectionData.map((checked, index) => {
//       let row = {};
//       headers.forEach((header, idx) => {
//         row[header.label] = checked[idx] || false;
//       });
//       return row;
//     });
//     result[section] = mappedData;
//     return result;
//   }, {});
// };

// const countriesMapped = mapRowCheckedToHeaders(
//   formattedRows?.payload?.alert?.rowChecked,
//   HEADERS
// );
// useEffect(() => {
//   if (
//     countriesMapped &&
//     Object.keys(countriesMapped).length > 0 &&
//     !updatedOnce
//   ) {
//     const convertToLabeledArray = (countriesMapped) => {
//       const result = {};
//       for (const section in countriesMapped) {
//         result[section] = countriesMapped[section].map((row) => {
//           return Object.entries(row).map(([key, value]) => {
//             return {
//               label: key,
//               checked: value,
//             };
//           });
//         });
//       }
//       return result;
//     };

//     const labeled = convertToLabeledArray(countriesMapped);
//     dispatch(alertDetailsData({ countriesMapped: labeled }));
//     setUpdatedOnce(true);
//   }
// }, [countriesMapped, updatedOnce]);

// const alertDetailss = useSelector((state) => state.alert.alertDetails || {});
// useEffect(() => {
//   const alreadyInitialized =
//     Array.isArray(existingRowIcons) && existingRowIcons.length === rows.length;
//   if (alreadyInitialized) return;

//   const rowCount = rows.length;
//   const colCount = headers.length;
//   const isLegs = sectionTitle === "Legs";
//   const subCounts = isLegs ? rows.map((r) => r.subLabels?.length || 0) : null;

//   dispatch(
//     initializeRows({
//       sectionTitle,
//       rowCount,
//       colCount,
//       subCounts,
//       isLegs,
//     })
//   );
// }, [sectionTitle, rows, headers.length, existingRowIcons]);

// const handleSectionClick = () => {
//   sectionApiCall(sectionTitle);
//   dispatch(toggleSectionExpand({ sectionTitle }));
// };

// const handleColumnCheckboxChange = (colIndex, sectiontitle) => {
//   const section = sectiontitle || sectionTitle;
//   const rows = alertDetailss[section];

//   if (!rows) return;
//   const total = rows.length;
//   const checked = rows.filter((row) => row[colIndex]?.checked === true).length;
//   const enable = checked !== total;

//   dispatch(
//     setEntireColumnIcons({
//       sectionTitle: section,
//       colIndex,
//       value: enable,
//     })
//   );
// };

// const handleClearColumn = (colIndex) => {
//   dispatch(
//     setEntireColumnIcons({
//       sectionTitle,
//       colIndex,
//       value: false,
//     })
//   );
// };

// useImperativeHandle(ref, () => ({
//   handleColumnCheckboxChange,
//   handleClearColumn,
// }));
// const isCountries = sectionTitle === "Countries";

// const filteredHeaders = isCountries
//   ? headers.filter((h) => h.label === "Location Entry")
//   : headers;
// const sectionData = alertDetailss[sectionTitle] || [];
// const sectionIndeterminate =
//   sectionData.some((row) => row.some((cell) => cell.checked)) &&
//   !sectionData.every((row) => row.every((cell) => cell.checked));

// const getColumnCheckboxState = (sectionTitle, label) => {
//   // console.log("section::_checked:::", sectionTitle, rows);

//   if (!Array.isArray(rows)) {
//     return { checked: false, indeterminate: false };
//   }
//   let total = 0;
//   let checkedCount = 0;

//   rows.forEach((cell) => {
//     total++;
//     if (cell[label] === true) {
//       checkedCount++;
//     }
//   });
//   return {
//     checked: checkedCount === total && total > 0,
//     indeterminate: checkedCount > 0 && checkedCount < total,
//   };
// };

// const handlCheckboxChange = (sectionTitle, label, key, isChecked) => {
//   dispatch(
//     setHeaderTypeAllSelect({ section: sectionKey, headerKey: key, isChecked })
//   );
// };
// useEffect(() => {
//   dispatch(toggleSectionExpand({ sectionTitle: "Produce Type" }));
// }, []);

// const handleRowCheckboxChange = (rowIndex, sectionTitle) => {
//   const row = alertDetailss?.[sectionTitle]?.[rowIndex];
//   if (!row) return;
//   const allActive = row.every((cell) => cell.checked === true);
//   dispatch(
//     setEntireRowIcons({
//       sectionTitle,
//       rowIndex,
//       value: !allActive,
//     })
//   );
// };

// const handleIconClick = ({
//   rowIndex,
//   colIndex,
//   sectionTitle,
//   headerLabel,
// }) => {
//   const updatedSection = alertDetailss[sectionTitle].map((row, rIndex) => {
//     if (rIndex === rowIndex) {
//       return row.map((cell) => {
//         if (cell.label === headerLabel) {
//           return { ...cell, checked: !cell.checked };
//         }
//         return cell;
//       });
//     }

//     return row;
//   });

//   dispatch(
//     alertDetailsData({
//       countriesMapped: { ...alertDetailss, [sectionTitle]: updatedSection },
//     })
//   );
// };

// const StyledTableRow = styled(TableRow)(() => ({
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
