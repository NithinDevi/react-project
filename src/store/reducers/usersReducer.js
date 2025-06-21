import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersData } from "../thunk/alertThunks";
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        rows: data,
      };
    },
    setUsersSelectedIds: (state, action) => {
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
    updateOnUserNameClick: (state, action) => {
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

      return {
        ...newState,
        isAllChecked,
        isIndeterminate,
        selectedRows:
          selectedIndex === -1
            ? [...prevSelectedRows, updatedRow]
            : prevSelectedRows.splice(selectedIndex, 1, updatedRow),
      };
    },
    updateUserRowsByHeaderType: (state, action) => {
      const { headerKey, isChecked } = action.payload;
      const newState = { ...state };

      newState.rows = newState.rows.map((row) => ({
        ...row,
        [headerKey]: isChecked,
      }));
      // Need to update selectd boxes on header select

      return { ...newState };
    },
    updateOnUserIconClick: (state, action) => {
      const { rowId, headerKey } = action.payload;
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
    onUsersSelectAllClick: (state, action) => {
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
      .addCase(fetchUsersData.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          rows: [],
          errorMsg: "",
        };
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        const mapFormat = state.selectedRows.map((row) => [row.Id, row]);
        const map = new Map(mapFormat);
        return {
          ...state,
          isLoading: false,
          errorMsg: "",
          rows: action.payload.map((row) => {
            const isSelected = map.has(row.Id);
            if (isSelected) {
              return map.get(row.Id);
            }
            return row;
          }),
        };
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          rows: [],
          errorMsg: action.payload.message,
        };
      });
  },
});

export const {
  setUsersData,
  updateUserRowsByHeaderType,
  updateOnUserIconClick,
  updateOnUserNameClick,
  onUsersSelectAllClick,
  setUsersSelectedIds,
} = userSlice.actions;

export default userSlice.reducer;
