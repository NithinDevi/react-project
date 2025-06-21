import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../../common/confirmationDialog";
import TableLayout from "../../components/tableLayout";
import { filterHeaders } from "../../components/tableLayout/constants";
import SectionHeaderCheckbox from "../../components/tableLayout/container/SectionHeaderCheckbox";
import { StyledTableCell } from "../../components/tableLayout/helper";
import {
  closeConfirmationDialog,
  openConfirmationDialog,
  toggleAllChecked,
  toggleColumnChecked,
  toggleSectionExpand,
} from "../../store/reducers/alertSlice";
import { fetchProduceType } from "../../store/thunk/alertThunks";
import { sectionsConfig } from "./config";
import "./style.css";
import { useContextProvider } from "../../context";

function Alert() {
  const { showSnackBarMessage } = useContextProvider();
  const dispatch = useDispatch();
  const allChecked = useSelector((state) => state.alert.allChecked);
  const openDialog = useSelector((state) => state.alert.openDialog);
  const dialogType = useSelector((state) => state.alert.dialogType);
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    getProduceTypes();
  }, []);

  const getProduceTypes = async () => {
    dispatch(fetchProduceType());
    dispatch(toggleSectionExpand({ sectionTitle: "Produce Type" }));
  };

  const handleConfirmAction = () => {
    dispatch(closeConfirmationDialog());
    showSnackBarMessage("Alerts Updated Successfully!");
  };

  const handleSaveClick = () => {
    setShowButtons(true);
    dispatch(openConfirmationDialog("Save"));
  };

  return (
    <div className="main2">
      <div className="alert-container">
        <header className="alert-header" style={{ marginBottom: "50px" }}>
          <Typography
            variant="h5"
            style={{ color: "#13ade8", fontWeight: "bold" }}
          >
            Alert Set Up
          </Typography>
          <div className="toggle-container">
            <div className="toggles">
              <div className="toggle1">
                <Typography variant="h6">Email Notifications</Typography>
                <div className="checkbox-one">
                  <input className="check" id="check-one" type="checkbox" />
                  <label htmlFor="check-one"></label>
                </div>
              </div>
              <div className="toggle2">
                <Typography variant="h6">App Notifications</Typography>
                <div className="checkbox-two">
                  <input className="yep" id="check-two" type="checkbox" />
                  <label htmlFor="check-two"></label>
                </div>
              </div>
            </div>
          </div>

          <div
            className="buttons"
            style={{ height: "50px", display: "flex", gap: "10px" }}
          >
            {showButtons ? (
              <>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    border: "1px solid black",
                    fontWeight: "bold",
                  }}
                  className="button1"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    backgroundColor: "grey",
                    border: "1px solid black",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    setShowButtons(true);
                    dispatch(openConfirmationDialog("Cancel"));
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <div style={{ width: "210px" }}></div>
            )}
          </div>
        </header>
      </div>

      <ConfirmationDialog
        open={openDialog}
        title="Alert Subscription!"
        message={
          dialogType === "Cancel"
            ? "You have unsaved changes. Discard them?"
            : "Are you sure you want to save the changes?"
        }
        onConfirm={handleConfirmAction}
        onClose={() => dispatch(closeConfirmationDialog())}
        dialogType={dialogType}
      />

      <TableContainer
        sx={{ width: "100%", marginBottom: "4px", cursor: "pointer" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{
                  padding: "8px 0px",
                  marginBottom: "4px",
                  width: "200px",
                  backgroundColor: "#27496d",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allChecked}
                      onChange={(e) =>
                        dispatch(
                          toggleAllChecked({
                            checked: e.target.checked,
                          })
                        )
                      }
                      sx={{
                        color: "white",
                        paddingLeft: "20px",
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        paddingLeft: "10px",
                      }}
                    >
                      Select All
                    </Typography>
                  }
                  sx={{ marginRight: "10px" }}
                />
              </StyledTableCell>
              {filterHeaders.map((header) => (
                <StyledTableCell
                  key={`select-all-${header.label}`}
                  style={{
                    padding: "8px 0px",
                    marginBottom: "4px",
                    backgroundColor: "#27496d",
                  }}
                >
                  <SectionHeaderCheckbox
                    label={header.label}
                    isChecked={false}
                    onChange={(event) => {
                      const isChecked = event.target.checked;
                      const label = header.label;
                      dispatch(
                        toggleColumnChecked({
                          label,
                          isChecked,
                        })
                      );
                    }}
                  />
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {sectionsConfig.map((section) => (
            <TableLayout
              key={section.key}
              sectionKey={section.key}
              sectionTitle={section.title}
              headers={section.headers}
              data={section.apiResponse}
              apiKey={section.apiKey}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Alert;

// const sectionApiCall = (sectionKey) => {
//   console.log("section_click::", sectionKey);
//   if (sectionKey === PARENT_ORG) {
//     const checkedIds = selectedCheckBoxes.produce_type
//       .filter((item) => item.isChecked)
//       .map((item) => item.Id);
//     dispatch(fetchParentOrgs(checkedIds));
//   } else if (sectionKey === USERS) {
//     const checkedIds = selectedCheckBoxes.parent_org
//       .filter((item) => item.isChecked)
//       .map((item) => item.Id);
//     dispatch(fetchUsersData(checkedIds));
//   } else if (sectionKey === LEGS) {
//     const userIds = selectedCheckBoxes.users
//       .filter((item) => item.isChecked)
//       .map((item) => item.Id);
//     const produceIds = selectedCheckBoxes.produce_type
//       .filter((item) => item.isChecked)
//       .map((item) => item.Id);
//     dispatch(
//       fetchLegsData({
//         userIds,
//         produceIds,
//       })
//     );
//   } else if (sectionKey === COUNTRIES) {
//     const checkedIds = selectedCheckBoxes.users
//       .filter((item) => item.isChecked)
//       .map((item) => item.Id);
//     dispatch(fetchCountriesData(checkedIds));
//   }
// };

{
  /* <Box
  sx={{
    backgroundColor: "#27496d",
    display: "flex",
    width: "100%",
    marginBottom: "4px",
    padding: "5px 0px",
  }}
>
  <FormControlLabel
    control={
      <Checkbox
        checked={allChecked}
        onChange={(e) =>
          dispatch(
            toggleAllChecked({
              checked: e.target.checked,
              alertDetailss,
            })
          )
        }
        sx={{
          color: "white",
          paddingLeft: "20px",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      />
    }
    label={
      <Typography
        sx={{
          color: "white",
          fontWeight: "bold",
          paddingLeft: "10px",
        }}
      >
        Select All
      </Typography>
    }
    sx={{ marginRight: "10px" }}
  />
  </div>

  <div style={{ flexGrow: 1, display: "flex" }}>
    {filterHeaders.map((header, index) => (
      <>
        <SectionHeaderCheckbox
          label={header.label}
          key={`select-all-${header.label}`}
          isChecked={isLabelFullyChecked(alertDetailss, header.label)}
          onChange={(event) => {
            const isChecked = event.target.checked;
            const label = header.label;
            dispatch(
              toggleColumnChecked({
                label,
                isChecked,
                alertDetailss: JSON.parse(JSON.stringify(alertDetailss)),
              })
            );
            if (label) {
              tableRef.current?.handleColumnCheckboxChange(index, label);
            } else {
              tableRef.current?.handleClearColumn(index);
            }
          }}
        />
        <div
                key={`select-all-${header.label}`}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                <Checkbox
                  checked={isLabelFullyChecked(alertDetailss, header.label)}
                  onChange={(event) => {
                    const isChecked = event.target.checked;
                    const label = header.label;
                    dispatch(
                      toggleColumnChecked({
                        label,
                        isChecked,
                        alertDetailss: JSON.parse(
                          JSON.stringify(alertDetailss)
                        ),
                      })
                    );
                    if (label) {
                      tableRef.current?.handleColumnCheckboxChange(
                        index,
                        label
                      );
                    } else {
                      tableRef.current?.handleClearColumn(index);
                    }
                  }}
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    marginLeft: "8px",
                  }}
                >
                  {header.label}
                </Typography>
              </div>
      </>
    ))}
  </div>
</Box>; */
}
