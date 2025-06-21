import { createSlice, current } from "@reduxjs/toolkit";
import { fetchCountriesData } from "../thunk/alertThunks";
import { formatObj } from "../../components/tableLayout/constants";

const initialState = {
  isAllChecked: false,
  isLoading: false,
  rows: [],
  errorMessage: "",
  selectedRows: [],
  ...formatObj,
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountriesData: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        rows: data,
      };
    },
    setCountrisSelectedIds: (state, action) => {
      const { ids } = action.payload;
      const selectedData = [];
      const set = new Set(ids);

      state.rows.forEach((row) => {
        if (set.has(row.CountryId)) {
          selectedData.push(row);
          set.delete(row.CountryId);
        }
      });
      console.log("country_selected::", selectedData);
      return {
        ...state,
        selectedRows: selectedData,
      };
    },
    updateOnCountryNameClick: (state, action) => {
      const { rowId, isChecked } = action.payload;
      let updatedRow = {};
      const newState = { ...state };
      const selectedIndex = newState.selectedRows.findIndex(
        (selected) => selected.CountryId === rowId
      );
      newState.rows = newState.rows.map((row) => {
        if (row.CountryId === rowId) {
          updatedRow = {
            ...row,
            isChecked: !isChecked,
            EntrySubscribed: !isChecked,
          };

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
    updateCountryTypeRowsByHeaderType: (state, action) => {
      const { headerKey, isChecked } = action.payload;
      const newState = { ...state };

      newState.rows = newState.rows.map((row) => ({
        ...row,
        [headerKey]: isChecked,
        isChecked: isChecked,
      }));
      // Need to update selectd boxes on header select

      return { ...newState };
    },
    updateOnCountryTypeIconClick: (state, action) => {
      const { rowId, headerKey } = action.payload;
      const newState = { ...state };
      newState.rows = newState.rows.map((row) => {
        return row.CountryId === rowId
          ? { ...row, [headerKey]: !row[headerKey], isChecked: !row[headerKey] }
          : row;
      });

      const isAllChecked = newState.rows.every((row) => row.isChecked);
      const isIndeterminate = newState.rows.some((row) => row.isChecked);
      return { ...newState, isAllChecked, isIndeterminate };
    },
    onCountriesSelectAllClick: (state, action) => {
      const { isChecked } = action.payload;
      return {
        ...state,
        isAllChecked: isChecked,
        selectedRows: isChecked ? [...state.rows] : [],
        rows: state.rows.map((row) => ({
          ...row,
          isChecked,
          EntrySubscribed: isChecked,
        })),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesData.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          rows: [],
          errorMsg: "",
        };
      })
      .addCase(fetchCountriesData.fulfilled, (state, action) => {
        const mapFormat = state.selectedRows.map((row) => [row.CountryId, row]);
        const selData = current(state.selectedRows);
        const map = new Map(mapFormat);
        console.log("country_data::", map, action.payload, selData);
        return {
          ...state,
          isLoading: false,
          errorMsg: "",
          rows: action.payload.map((row) => {
            const isSelected = map.has(row.CountryId);
            if (isSelected) {
              const dt = map.get(row.CountryId);
              // console.log("selected_country::", dt);
              map.delete(row.CountryId);
              return dt;
            }
            return row;
          }),
        };
      })
      .addCase(fetchCountriesData.rejected, (state, action) => {
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
  setCountriesData,
  updateCountryTypeRowsByHeaderType,
  updateOnCountryNameClick,
  updateOnCountryTypeIconClick,
  onCountriesSelectAllClick,
  setCountrisSelectedIds,
} = countrySlice.actions;

export default countrySlice.reducer;
