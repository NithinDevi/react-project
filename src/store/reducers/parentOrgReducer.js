import { createSlice } from "@reduxjs/toolkit";
import { fetchParentOrgs } from "../thunk/alertThunks";
import { formatObj } from "../../components/tableLayout/constants";
import { isRowAllSelected } from "./helper";

const initialState = {
  isAllChecked: false,
  isLoading: false,
  rows: [],
  errorMessage: "",
  selectedRows: [],
  ...formatObj,
};

const parentOrgSlice = createSlice({
  name: "parentOrg",
  initialState,
  reducers: {
    setParentOrgData: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        rows: data,
      };
    },
    setParentOrgSelectedIds: (state, action) => {
      const { ids } = action.payload;
      const selectedData = [];
      const set = new Set(ids);

      state.rows.forEach((row) => {
        if (set.has(row.Id)) {
          selectedData.push(row);
          set.delete(row.Id);
        }
      });
      return {
        ...state,
        selectedRows: selectedData,
      };
    },
    updateOnParentOrgNameClick: (state, action) => {
      const { rowId, isChecked } = action.payload;
      let updatedRow = {};
      const newState = { ...state };
      const selectedIndex = newState.selectedRows.findIndex(
        (selected) => selected.Id === rowId
      );
      const allHeadersSelect = Object.keys(formatObj).reduce((acc, obj) => {
        acc[obj] = !isChecked;
        return acc;
      }, {});
      console.log("all_select::", allHeadersSelect);
      newState.rows = newState.rows.map((row) => {
        if (row.Id === rowId) {
          updatedRow = { ...row, ...allHeadersSelect };

          return updatedRow;
        }
        return row;
      });
      const prevSelectedRows = [...newState.selectedRows];

      const isAllChecked = newState.rows.every((row) => row.isChecked);
      const isIndeterminate = newState.rows.some((row) => row.isChecked);

      const selectedRows =
        selectedIndex === -1
          ? [...prevSelectedRows, updatedRow]
          : [...prevSelectedRows.splice(selectedIndex, 1, updatedRow)];

      return {
        ...newState,
        isAllChecked,
        isIndeterminate,
        selectedRows,
      };
    },
    updateParentOrgRowsByHeaderType: (state, action) => {
      const { headerKey, isChecked } = action.payload;
      const newState = { ...state };

      newState.rows = newState.rows.map((row) => ({
        ...row,
        [headerKey]: isChecked,
      }));
      // Need to update selectd boxes on header select

      return { ...newState };
    },
    updateOnParentOrgIconClick: (state, action) => {
      const { rowId, headerKey, isChecked } = action.payload;
      const newState = { ...state };
      newState.rows = newState.rows.map((row) => {
        if (row.Id === rowId) {
          const { isChecked, isIndeterminate } = isRowAllSelected({
            ...row,
            [headerKey]: !row[headerKey],
          });

          return {
            ...row,
            [headerKey]: !row[headerKey],
            isChecked,
            isIndeterminate,
          };
        }
        return row;
      });

      const isAllChecked = newState.rows.every((row) => row.isChecked);
      const isIndeterminate = newState.rows.some((row) => row.isChecked);
      return { ...newState, isAllChecked, isIndeterminate };
    },
    onParentOrgSelectAllClick: (state, action) => {
      const { isChecked } = action.payload;
      const allHeadersSelect = Object.keys(formatObj).reduce((acc, obj) => {
        acc[obj] = isChecked;
        return acc;
      }, {});
      return {
        ...state,
        isAllChecked: isChecked,
        selectedRows: isChecked ? [...state.rows] : [],
        rows: state.rows.map((row) => ({ ...row, ...allHeadersSelect })),
        ...allHeadersSelect,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentOrgs.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          rows: [],
          errorMessage: "",
        };
      })
      .addCase(fetchParentOrgs.fulfilled, (state, action) => {
        const mapFormat = state.selectedRows.map((row) => [row.Id, row]);
        const map = new Map(mapFormat);
        return {
          ...state,
          isLoading: false,
          errorMessage: "",
          rows: action.payload.map((row) => {
            const isSelected = map.has(row.Id);
            if (isSelected) {
              return map.get(row.Id);
            }
            return row;
          }),
        };
      })
      .addCase(fetchParentOrgs.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          rows: [],
          errorMessage: action.payload.message,
        };
      });
  },
});

export const {
  setParentOrgData,
  updateOnParentOrgNameClick,
  updateParentOrgRowsByHeaderType,
  updateOnParentOrgIconClick,
  onParentOrgSelectAllClick,
  setParentOrgSelectedIds,
} = parentOrgSlice.actions;

export default parentOrgSlice.reducer;
