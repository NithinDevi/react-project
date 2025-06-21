import { createSlice, current } from "@reduxjs/toolkit";
import { fetchLegsData, fetchLegsGeofenceApi } from "../thunk/alertThunks";
import { formatObj } from "../../components/tableLayout/constants";
import { headersObj, isRowAllSelected } from "./helper";

const initialState = {
  isAllChecked: false,
  isLoading: false,
  rows: [],
  errorMessage: "",
  selectedRows: [],
  ...formatObj,
};

const legsSlice = createSlice({
  name: "legs",
  initialState,
  reducers: {
    setLegsData: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        rows: data,
      };
    },
    setLegsSelectedIds: (state, action) => {
      const { ids } = action.payload;
      const selectedData = [];
      const set = new Set(ids);

      state.rows.forEach((row) => {
        if (set.has(row.LegTypeId)) {
          selectedData.push(row);
          set.delete(row.LegTypeId);
        }
      });

      console.log("select_data::", selectedData);
      return {
        ...state,
        selectedRows: selectedData,
      };
    },
    updateOnLegsNameClick: (state, action) => {
      const { rowId, parentLegId, isChecked } = action.payload;

      let updatedRow = {};
      const newState = { ...state };
      const selectedIndex = newState.selectedRows.findIndex(
        (selected) => selected.Id === parentLegId
      );
      const allHeadersSelect = (row) =>
        Object.keys(formatObj).reduce((acc, obj) => {
          acc[obj] = row[obj] === null ? null : !isChecked;
          return acc;
        }, {});
      // let currentRowChecked = false;
      newState.rows = newState.rows.map((row) => {
        if (row.LegTypeId === parentLegId) {
          updatedRow = {
            ...row,
            LegTypeSubscriptions: row.LegTypeSubscriptions.map((subRow) => {
              if (subRow.GeofenceId === rowId) {
                const newRow = allHeadersSelect(subRow);
                return {
                  ...subRow,
                  ...newRow,
                };
              }
              return subRow;
            }),
            isChecked: row.LegTypeSubscriptions.every((subRow) =>
              subRow.GeofenceId === rowId
                ? !isChecked
                : subRow.isChecked === true
            ),
            isIndeterminate: row.LegTypeSubscriptions.some((subRow) =>
              subRow.GeofenceId === rowId
                ? !isChecked
                : subRow.isChecked === true
            ),
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
    updateLegsTypeRowsByHeaderType: (state, action) => {
      const { headerKey, isChecked } = action.payload;
      const newState = { ...state };

      newState.rows = newState.rows.map((row) => ({
        ...row,
        [headerKey]: isChecked,
        LegTypeSubscriptions: row.LegTypeSubscriptions.map((subRow) => ({
          ...subRow,
          [headerKey]: isChecked,
        })),
      }));
      // Need to update selectd boxes on header select

      return { ...newState };
    },
    updateOnLegsTypeIconClick: (state, action) => {
      const { rowId, headerKey, parentLegId } = action.payload;
      const newState = { ...state };
      let currentRowChecked = false;

      newState.rows = newState.rows.map((row) => {
        return row.LegTypeId === parentLegId
          ? {
              ...row,
              LegTypeSubscriptions: row.LegTypeSubscriptions.map((subRow) => {
                if (subRow.GeofenceId === rowId) {
                  const { isChecked, isIndeterminate } = isRowAllSelected({
                    ...subRow,
                    [headerKey]: !subRow[headerKey],
                  });
                  currentRowChecked = isChecked;
                  return {
                    ...subRow,
                    [headerKey]: !subRow[headerKey],
                    isChecked,
                    isIndeterminate,
                  };
                }
                return subRow;
              }),
              isChecked: row.LegTypeSubscriptions.every((subRow) =>
                subRow.GeofenceId == rowId
                  ? currentRowChecked
                  : subRow.isChecked == true
              ),
              isIndeterminate: row.LegTypeSubscriptions.some((subRow) =>
                subRow.GeofenceId == rowId
                  ? currentRowChecked
                  : subRow.isChecked == true
              ),
            }
          : row;
      });

      const isAllChecked = newState.rows.every((row) => row.isChecked);
      const isIndeterminate = newState.rows.some((row) => row.isChecked);
      return { ...newState, isAllChecked, isIndeterminate };
    },
    onLegsTypeSelectAllClick: (state, action) => {
      const { isChecked } = action.payload;
      const allHeadersSelect = (row) =>
        Object.keys(formatObj).reduce((acc, obj) => {
          acc[obj] = row[obj] === null ? null : isChecked;
          return acc;
        }, {});
      return {
        ...state,
        isAllChecked: isChecked,
        selectedRows: isChecked ? [...state.rows] : [],
        rows: state.rows.map((row) => ({
          ...row,
          isChecked,
          LegTypeSubscriptions: row.LegTypeSubscriptions.map((subRow) => ({
            ...subRow,
            ...allHeadersSelect(row),
          })),
        })),
      };
    },
    handleLegsRowExpand: (state, action) => {
      const { legTypeId, isExpanded } = action.payload;
      return {
        ...state,
        rows: state.rows.map((row) => {
          return row.LegTypeId === legTypeId ? { ...row, isExpanded } : row;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLegsData.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          rows: [],
          errorMessage: "",
        };
      })
      .addCase(fetchLegsData.fulfilled, (state, action) => {
        const mapFormat = state.selectedRows.map((row) => [row.LegTypeId, row]);
        const map = new Map(mapFormat);
        console.log("pre_selected_legs", current(state.selectedRows), map);
        return {
          ...state,
          isLoading: false,
          errorMsg: "",
          rows: action.payload.map((row) => {
            const isSelected = map.has(row.LegTypeId);
            if (isSelected) {
              return map.get(row.LegTypeId);
            }
            return row;
          }),
        };
      })
      .addCase(fetchLegsData.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          rows: [],
          errorMessage: action.payload.message,
        };
      })
      .addCase(fetchLegsGeofenceApi.pending, (state, action) => {
        // take the legType id and set isLoading true
        const rowId = action.meta.arg.legTypeIds[0];
        return {
          ...state,
          rows: state.rows.map((row) => {
            return row.LegTypeId === rowId ? { ...row, isLoading: true } : row;
          }),
        };
      })
      .addCase(fetchLegsGeofenceApi.fulfilled, (state, action) => {
        const { legTypeIds, data } = action.payload;

        return {
          ...state,
          rows: state.rows.map((row) => {
            if (legTypeIds.includes(row.LegTypeId)) {
              const match = data.find((d) => d.LegTypeId === row.LegTypeId);

              return {
                ...row,
                isChecked: false,
                isLoading: false,
                isExpanded: true,
                LegTypeSubscriptions: match?.LegTypeSubscriptions || [],
              };
            }
            return row;
          }),
        };
      })
      .addCase(fetchLegsGeofenceApi.rejected, (state, action) => {
        const rowId = action.meta.org.legTypeIds[0];
        state.legs = {
          ...state.legs,
          isLoading: false,
          errorMessage: "ERROR OCCURRED",
          rows: state.rows.map((row) => {
            return row.LegTypeId === rowId ? { ...row, isLoading: false } : row;
          }),
        };
      });
    // .addCase(fetchLegsWithGeofencesData.pending, (state) => {
    //   // need to update to particular rows
    //   state.legTypeSubscriptions = {
    //     isLoading: true,
    //     rows: [],
    //     errorMessage: "",
    //   };
    // })
    // .addCase(fetchLegsWithGeofencesData.fulfilled, (state, action) => {
    //   state.legTypeSubscriptions = {
    //     isLoading: false,
    //     rows: action.payload,
    //     errorMessage: "",
    //   };
    // })
    // .addCase(fetchLegsWithGeofencesData.rejected, (state, action) => {
    //   state.legTypeSubscriptions = {
    //     isLoading: false,
    //     rows: [],
    //     errorMessage: action.payload?.message || "Error fetching geofences",
    //   };
    // });
  },
});

export const {
  setLegsData,
  updateLegsTypeRowsByHeaderType,
  updateOnLegsNameClick,
  updateOnLegsTypeIconClick,
  onLegsTypeSelectAllClick,
  handleLegsRowExpand,
  setLegsSelectedIds,
} = legsSlice.actions;

export default legsSlice.reducer;
