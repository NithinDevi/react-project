import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
const initialState = {
  expandedSections: {},
  allChecked: false,
  openDialog: false,
  dialogType: "",
  alertDetails: {},
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    toggleSectionExpand: (state, action) => {
      const { sectionKey } = action.payload;
      const updatedSections = { ...state.expandedSections };
      if (sectionKey in updatedSections === false) {
        updatedSections[sectionKey] = false;
      }
      for (const key in updatedSections) {
        if (key === sectionKey) {
          updatedSections[key] = !updatedSections[key];
        } else {
          updatedSections[key] = false;
        }
      }
      state.expandedSections = updatedSections;
    },
    toggleAllChecked: (state, action) => {
      const { checked } = action.payload;
      state.allChecked = checked;
      state.alertDetails = produce(state.alertDetails, (draft) => {
        Object.keys(draft).forEach((section) => {
          draft[section].forEach((row) => {
            row.forEach((cell) => {
              cell.checked = checked;
            });
          });
        });
      });
    },
    toggleColumnChecked: (state, action) => {
      // const { isChecked, label } = action.payload;
      // const updated = JSON.parse(JSON.stringify(alertDetailss));
      // state.alertDetails = updated;
    },
    openConfirmationDialog: (state, action) => {
      state.dialogType = action.payload;
      state.openDialog = true;
    },

    closeConfirmationDialog: (state) => {
      state.openDialog = false;
      state.dialogType = "";
    },
  },
});

export const {
  toggleSectionExpand,
  toggleAllChecked,
  toggleColumnChecked,
  initializeRows,
  toggleRowChecked,
  toggleSectionChecked,
  openConfirmationDialog,
  closeConfirmationDialog,
} = alertSlice.actions;

export default alertSlice.reducer;
