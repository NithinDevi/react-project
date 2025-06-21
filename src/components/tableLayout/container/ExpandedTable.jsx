import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useContextProvider } from "../../../context";
import { LEGS } from "../../../pages/alert/config";
import {
  getIconClickAction,
  getNameChangeAction,
  StyledTableCell,
} from "../helper";
import SectionNameCheckbox from "./SectionNameCheckbox";
import TableBodyRow from "./TableRow";
import { handleLegsRowExpand } from "../../../store/reducers/legsReducer";

const ExpandedTable = ({ headers, data, sectionKey, handleLegNameClick }) => {
  const dispatch = useDispatch();
  const { showSnackBarMessage } = useContextProvider();

  const handleNameClick = (rowId, isChecked, parentLegId) => {
    console.log("row_click", rowId, isChecked, parentLegId);
    if (sectionKey === LEGS) {
      dispatch(
        getNameChangeAction(sectionKey)({ rowId, parentLegId, isChecked })
      );
    } else {
      dispatch(getNameChangeAction(sectionKey)({ rowId, isChecked }));
    }
  };

  const handleIconClick = (rowId, headerKey, isChecked, parentLegId) => {
    if (data.length > 0) {
      dispatch(
        getIconClickAction(sectionKey)({
          rowId,
          headerKey,
          parentLegId,
          isChecked,
        })
      );
    } else {
      showSnackBarMessage("Please select rows...!");
    }
  };
  const handleRowExpand = (legTypeId, isExpanded) => {
    dispatch(handleLegsRowExpand({ legTypeId, isExpanded }));
  };

  return (
    <TableContainer
      sx={{
        width: "100%",
        marginBottom: "4px",
        cursor: "pointer",
        maxHeight: "400px",
        overflow: "auto",
      }}
      className="expanded-table"
    >
      <Table>
        {sectionKey !== LEGS && (
          <TableBody>
            <TableBodyRow
              data={data}
              onNameClick={handleNameClick}
              onIconClick={handleIconClick}
              headers={headers}
              showIcons={true}
              sectionKey={sectionKey}
            />
          </TableBody>
        )}
        {sectionKey === LEGS && (
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={`${row.LegTypeId}-${row.LegTypeName}`}>
                <TableRow>
                  <StyledTableCell
                    style={{
                      padding: "8px 0px",
                      width: "200px",
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: headerBackgroundColor(sectionKey),
                    }}
                  >
                    {row.isExpanded ? (
                      <ExpandMoreIcon
                        onClick={() =>
                          handleRowExpand(row.LegTypeId, !row.isExpanded)
                        }
                      />
                    ) : (
                      <ExpandLessIcon
                        onClick={() =>
                          handleRowExpand(row.LegTypeId, !row.isExpanded)
                        }
                      />
                    )}

                    <SectionNameCheckbox
                      label={row.LegTypeName}
                      isChecked={row.isChecked}
                      id={row.LegTypeId}
                      indeterminate={row.isIndeterminate}
                      onChange={() => {
                        row.LegTypeSubscriptions.length == 0 && // If it has subRows avoid api call
                          handleLegNameClick(row.LegTypeId);
                      }}
                    />
                  </StyledTableCell>
                </TableRow>
                {row.isLoading ? (
                  <TableRow>
                    <StyledTableCell
                      style={{
                        padding: "8px 0px",
                        width: "200px",
                        textAlign: "center",
                        // backgroundColor: headerBackgroundColor(sectionKey),
                      }}
                      colSpan={headers.length}
                    >
                      <h3> Loading....</h3>
                    </StyledTableCell>
                  </TableRow>
                ) : (
                  row.LegTypeSubscriptions.length > 0 &&
                  row.isExpanded && (
                    <TableContainer
                      sx={{
                        width: "100%",
                        marginBottom: "4px",
                        cursor: "pointer",
                        maxHeight: "250px",
                        overflow: "auto",
                        paddingLeft: "40px",
                      }}
                      className="expanded-table"
                    >
                      <Table>
                        <TableBody>
                          <TableBodyRow
                            data={row.LegTypeSubscriptions}
                            onNameClick={(rowId, isChecked) =>
                              handleNameClick(rowId, isChecked, row.LegTypeId)
                            }
                            onIconClick={(rowId, headerKey, isChecked) =>
                              handleIconClick(
                                rowId,
                                headerKey,
                                isChecked,
                                row.LegTypeId
                              )
                            }
                            headers={headers}
                            showIcons={true}
                            isLegTypeRows={true}
                            sectionKey={sectionKey}
                          />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                )}
              </React.Fragment>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default ExpandedTable;

//  useEffect(() => {
//    if (data && Array.isArray(data)) {
//      const initialData = data.map((row) => {
//        const newRow = { ...row };
//        let idExists;
//        if (sectionKey === "PRODUCE_TYPE") {
//          idExists = selectedCheckBoxes.produce_type.some(
//            (item) => item.Id === newRow.Id
//          );
//        } else if (section === "PARENT_ORG") {
//          idExists = selectedCheckBoxes.parent_org.some(
//            (item) => item.Id === newRow.Id
//          );
//        } else if (section === "USERS") {
//          idExists = selectedCheckBoxes.users.some(
//            (item) => item.Id === newRow.Id
//          );
//        } else if (section === "COUNTRIES") {
//          idExists = selectedCheckBoxes.countries.some(
//            (item) => item.CountryId === newRow.CountryId
//          );
//        }
//        if (section !== "COUNTRIES") {
//          filterHeaders.forEach((header) => {
//            newRow[header.key] = row[header.key] || idExists;
//          });
//          newRow.isChecked = filterHeaders.every((header) => newRow[header.key]);
//        } else {
//          filterHeaders.forEach((header) => {
//            newRow.isLocationEntry = row["isLocationEntry"] || idExists;
//          });
//          newRow.isChecked = idExists;
//        }
//        return newRow;
//      });
//      setTableData(initialData);
//    }
//  }, [data]);

//  const sectionHeaders =
//    section === "COUNTRIES"
//      ? filterHeaders.filter((h) => h.key === "isLocationEntry")
//      : filterHeaders;

//  const handleNameClick = (rowId, rowKey) => {
//    let newData;
//    let updatedRow;

//    setTableData((prev) => {
//      updatedRow = [...tableData].find((eachRow) => {
//        return eachRow[rowKey] === rowId;
//      });
//      const newChecked = !updatedRow.isChecked;
//      updatedRow.isChecked = newChecked;
//      if (section === "LEGS") {
//        updatedRow.LegTypeSubscriptions = updatedRow.LegTypeSubscriptions.map(
//          (subscription) => {
//            const newSubscription = { ...subscription };
//            filterHeaders.forEach((header) => {
//              if (newSubscription[header.key] !== null) {
//                newSubscription[header.key] = newChecked;
//              }
//            });
//            return newSubscription;
//          }
//        );
//      } else {
//        sectionHeaders.forEach((header) => {
//          updatedRow[header.key] = newChecked;
//        });
//      }

//      newData = [...prev];
//      return newData;
//    });

//    let key = "";
//    if (section === "PRODUCE_TYPE") key = "produce_type";
//    else if (section === "PARENT_ORG") key = "parent_org";
//    else if (section === "USERS") key = "users";
//    else if (section === "LEGS") key = "legs";
//    else if (section === "COUNTRIES") key = "countries";
//    if (updatedRow) {
//      dispatch(
//        setSelectedCheckBoxes({
//          key,
//          row: JSON.parse(JSON.stringify(updatedRow)),
//        })
//      );
//    } else {

//    }
//  };

//  const handleIconClick = (rowId, headerKey) => {
//    let updatedRow;
//    // setTableData((prev) =>
//    tableData.map((row, index) => {
//      if (row.Id === rowId) {
//        updatedRow = { ...row };
//        updatedRow[headerKey] = !row[headerKey];

//        const hasTrue = sectionHeaders.some(
//          (header) => updatedRow[header.key] === true
//        );
//        const hasFalse = sectionHeaders.some(
//          (header) => updatedRow[header.key] === false
//        );

//        updatedRow.isChecked = hasTrue && !hasFalse;
//        updatedRow.isIndeterminate = hasTrue && hasFalse;

//        return updatedRow;
//      }
//      return row;
//    });
//    // );
//    dispatch(toggleIconChecked({ rowId, headerKey, section, updatedRow }));
//  };

// const handleLegsSubRowClick = (
//   LegTypeId,
//   GeofenceId,
//   isChecked,
//   updateKey
// ) => {
//   dispatch(
//     setLegSubRowSelect({ LegTypeId, GeofenceId, isChecked, updateKey })
//   );
// };

// const sectionAllChecked =
//   tableData.length > 0 && tableData.every((row) => row.isChecked);

// const handleSectionCheckboxChange = () => {
//   const total = tableData.length;
//   const checkedCount = tableData.filter((row) => row.isChecked).length;
//   const shouldCheckAll = checkedCount !== total;

//   setTableData((prev) =>
//     prev.map((row) => {
//       const updatedRow = {
//         ...row,
//         isChecked: shouldCheckAll,
//       };
//       sectionHeaders.forEach((header) => {
//         updatedRow[header.key] = shouldCheckAll;
//       });
//       return updatedRow;
//     })
//   );
// };

// const handleSubRowIconClick = (parentRowIndex, subRowIndex, headerKey) => {
//   setTableData((prev) =>
//     prev.map((row, rIdx) => {
//       if (rIdx !== parentRowIndex) return row;

//       const updatedSubs = row.LegTypeSubscriptions.map((sub, sIdx) => {
//         if (sIdx !== subRowIndex) return sub;

//         const current = sub[headerKey];
//         if (current === null) return sub;

//         return {
//           ...sub,
//           [headerKey]: !current,
//         };
//       });

//       return {
//         ...row,
//         LegTypeSubscriptions: updatedSubs,
//       };
//     })
//   );
// };

// const handleSubRowPageChange = (rowId, direction) => {
//   setPaginationState((prev) => {
//     const currentPage = prev[rowId] || 0;
//     const total =
//       tableData.find((r) => r.LegTypeId === rowId)?.LegTypeSubscriptions
//         ?.length || 0;
//     const maxPage = Math.ceil(total / rowsPerPage) - 1;
//     let newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
//     newPage = Math.max(0, Math.min(newPage, maxPage));
//     return {
//       ...prev,
//       [rowId]: newPage,
//     };
//   });
// };

// PAGINATION
//  const [pages, setPages] = useState({});

//  const getPaginatedSubRows = (row) => {
//    const allSubRows = row.LegTypeSubscriptions || [];
//    const currentPage = pages[row.LegTypeId] || 0;
//    const start = currentPage * rowsPerPage;
//    const end = start + rowsPerPage;
//    return allSubRows.slice(start, end);
//  };

//  const handleChangePage = (legTypeId, direction) => {
//    setPages((prev) => {
//      const currentPage = prev[legTypeId] || 0;
//      const currentRow = tableData.find((r) => r.LegTypeId === legTypeId);
//      const total = currentRow?.LegTypeSubscriptions?.length || 0;
//      const maxPage = Math.floor(total / rowsPerPage);

//      let newPage = currentPage;
//      if (direction === "next" && currentPage < maxPage) {
//        newPage = currentPage + 1;
//      } else if (direction === "prev" && currentPage > 0) {
//        newPage = currentPage - 1;
//      }
//      return { ...prev, [legTypeId]: newPage };
//    });
//  };

{
  /* <Box
      sx={{
        display: "flex",
        width: "100%",
        overflowY: "auto",
        maxHeight: "300px",
      }}
    >
      <Box sx={{ width: "250px" }}>
        {tableData.isLoading && <h3>Loading...</h3>}
        {tableData.map((row, rowIndex, subRow, GeofenceName) => (
          <Box key={`label-${row.Id ?? rowIndex}`}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "2px",
                height: "40px",
              }}
              onClick={() => {
                if (section === "LEGS") {


                  const userIds = selectedCheckBoxes.users
                    .filter((item) => item.isChecked)
                    .map((item) => item.Id);
                  const produceIds = selectedCheckBoxes.produce_type
                    .filter((item) => item.isChecked)
                    .map((item) => item.Id);
                  const legTypeID = row?.LegTypeId;
                  if (legTypeID) {
                    dispatch(
                      fetchLegsGeofenceApi({
                        legTypeIds: [legTypeID],
                        userIds,
                        produceIds,
                      })
                    );
                  } else {

                  }
                }
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id={row.Id}
                    className="checkbox"
                    checked={row.isChecked}
                    indeterminate={row.isIndeterminate}
                    onChange={() => {

                      // if (row.Id) {
                      handleNameClick(
                        row.Id ? row.Id : row.LegTypeId,
                        row.Id ? "Id" : "LegTypeId"
                      );
                      // } else if (row.LegTypeId) {
                      //   handleNameClick(row.LegTypeId);
                      // }
                    }}
                  />
                }
                label={
                  <span style={{ fontSize: "14px" }} className="labelName">
                    {row.Name ||
                      row.CountryName ||
                      row.LegTypeName ||
                      `Row ${rowIndex + 1}`}
                  </span>
                }
                sx={{ margin: 0, marginRight: 1 }}
              />
            </Box>
            {row.isLoading && <h3>Loading...</h3>}
            <>
              <Box sx={{ flexGrow: 1 }}>
                {section === "LEGS" &&
                  Array.isArray(row.LegTypeSubscriptions) &&
                  getPaginatedSubRows(row).map((subRow, subRowIndex) => (
                    <Box
                      key={`icons-${subRow.GeofenceId}-${subRow.GeofenceName}-${subRow.UserId}-${subRowIndex}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "56px",
                        height: "40px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "250px",
                          display: "flex",
                          alignItems: "center",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}
                      >
                        <Checkbox
                          id={subRow.Id}
                          className="checkbox"
                          checked={subRow.isChecked}
                          sx={{ padding: "4px" }}
                          onClick={(e) =>
                            handleLegsSubRowClick(
                              row.LegTypeId,
                              subRow.GeofenceId,
                              e.target.checked,
                              "isChecked"
                            )
                          }
                        />

                        <span
                          style={{
                            fontSize: "14px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "calc(100% - 40px)",
                          }}
                          className="labelName"
                        >
                          {subRow.GeofenceName}
                        </span>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          gap: "161px",
                          paddingLeft: "5px",
                        }}
                      >
                        {filterHeaders.map((header) => (
                          <Box
                            key={`${subRow.Id}-${subRowIndex}-${header.key}`}
                            sx={{
                              width: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor:
                                subRow[header.key] !== null
                                  ? "pointer"
                                  : "default",
                            }}
                            className="statusIcon"
                            onClick={() =>
                              subRow[header.key] !== null &&
                              handleSubRowIconClick(
                                rowIndex,
                                subRowIndex,
                                header.key
                              )
                            }
                          >
                            {subRow[header.key] === true ||
                            (subRow.isChecked &&
                              subRow[header.key] !== null) ? (
                              <CheckCircle sx={{ color: "green" }} />
                            ) : (
                              <Cancel
                                sx={{
                                  color:
                                    subRow[header.key] === null
                                      ? "grey"
                                      : "red",
                                }}
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}

                <Box>
                  {section === "LEGS" &&
                    row.LegTypeSubscriptions?.length > rowsPerPage && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 1,
                          paddingRight: "70px",
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleChangePage(row.LegTypeId, "prev")
                          }
                          disabled={(pages[row.LegTypeId] || 0) === 0}
                          size="small"
                        >
                          Prev
                        </Button>
                        <Button
                          onClick={() =>
                            handleChangePage(row.LegTypeId, "next")
                          }
                          disabled={
                            ((pages[row.LegTypeId] || 0) + 1) * rowsPerPage >=
                            row.LegTypeSubscriptions.length
                          }
                          size="small"
                        >
                          Next
                        </Button>
                      </Box>
                    )}
                </Box>
              </Box>
            </>
          </Box>
        ))}
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {section !== "LEGS" &&
          tableData.map((row, rowIndex) => (
            <Box
              key={`icons-${row.Id ?? rowIndex}`}
              sx={{
                display: "flex",
                alignItems: "center",
                height: "40px",
                paddingLeft: "56px",
                gap: "128px",
              }}
            >

              {sectionHeaders.map((header, colIndex) => (
                <Box
                  key={`${row.Id ?? rowIndex}-${header.key}`}
                  sx={{
                    width: "70px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleIconClick(row.Id, header.key)}
                  className="statusIcon"
                >
                  {row[header.key] ? (
                    <CheckCircle sx={{ color: "green" }} />
                  ) : (
                    <Cancel sx={{ color: "red" }} />
                  )}
                </Box>
              ))}
            </Box>
          ))}
      </Box>
    </Box> */
}
