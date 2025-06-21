import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCountriesApi,
  getLegsApi,
  getLegsGeofencesSubscriptionApi,
  getParentOrgApi,
  getProduceTypesApi,
  getUserApi,
} from "../../services/organizationAPI";
import { formatObj } from "../../components/tableLayout/constants";
import { setProduceTypeSelectedIds } from "../reducers/produceTypeReducer";
import { setUsersSelectedIds } from "../reducers/usersReducer";
import { setParentOrgSelectedIds } from "../reducers/parentOrgReducer";

export const fetchProduceType = createAsyncThunk(
  "produceType/fetchProduceType",
  async (_, { rejectWithValue }) => {
    const { success, data } = await getProduceTypesApi();
    if (success) {
      return data.map((row) => ({
        ...formatObj,
        ...row,
      }));
    } else {
      return rejectWithValue({
        message: "Failed to fetch produce types or data is not an array",
      });
    }
  }
);

export const fetchParentOrgs = createAsyncThunk(
  "parentOrg/fetchParentOrgs",
  async (ids, { rejectWithValue, dispatch }) => {
    dispatch(setProduceTypeSelectedIds({ ids }));
    const { success, data } = await getParentOrgApi(ids);
    if (success) {
      return data.map((row) => ({
        ...formatObj,
        ...row,
      }));
    } else {
      return rejectWithValue({
        message: "Failed to fetch product orgs or data is not an array",
      });
    }
  }
);

export const fetchUsersData = createAsyncThunk(
  "users/fetchUsersData",
  async (ids, { rejectWithValue, dispatch }) => {
    dispatch(setParentOrgSelectedIds({ ids }));
    const { success, data } = await getUserApi(ids);
    if (success) {
      return data.map((row) => ({
        ...formatObj,
        ...row,
      }));
    } else {
      return rejectWithValue({
        message: "Failed to fetch users data or data is not an array",
      });
    }
  }
);

export const fetchLegsData = createAsyncThunk(
  "legs/fetchLegsData",
  async (payload, { rejectWithValue, dispatch }) => {
    dispatch(setUsersSelectedIds({ ids: payload.userIds }));
    dispatch(setParentOrgSelectedIds({ ids: payload.produceIds }));
    const { success, data } = await getLegsApi(payload);

    if (success) {
      return data.map((row) => ({
        ...row,
        isChecked: false,
        isExpanded: false,
      }));
    } else {
      return rejectWithValue({
        message: "Failed to fetch legs data or data is not an array",
      });
    }
  }
);

export const fetchLegsWithGeofencesData = createAsyncThunk(
  "legs/fetchLegsWithGeofencesData",
  async (payload, { rejectWithValue }) => {
    try {
      const { userIds, produceIds } = payload;
      const { success, data: legs } = await getLegsApi({ userIds, produceIds });

      if (!success || !Array.isArray(legs)) {
        return rejectWithValue({ message: "Failed to fetch legs data." });
      }

      const nestedData = await Promise.all(
        legs.map(async (row) => {
          try {
            const geoResponse = await getLegsGeofencesSubscriptionApi({
              userIds,
              produceIds,
              legTypeIds: row.LegTypeId,
            });

            const LegTypeSubscriptions = Array.isArray(geoResponse.data)
              ? geoResponse.data
              : [];

            return {
              ...row,
              isChecked: false,
              LegTypeSubscriptions, // ✅ standardized field name
            };
          } catch (geoErr) {
            return {
              ...row,
              isChecked: false,
              LegTypeSubscriptions: [], // fallback to empty
            };
          }
        })
      );
      return nestedData;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const fetchCountriesData = createAsyncThunk(
  "countries/fetchCountriesData",
  async (payload, { rejectWithValue, dispatch }) => {
    dispatch(setUsersSelectedIds({ ids: payload }));
    const { success, data } = await getCountriesApi(payload);
    if (success) {
      return data.map((row) => ({
        ...row,
        isChecked: false,
        isLocationEntry: false,
        EntrySubscribed: row.IsEntrySubscribed,
        ExitSubscribed: row.IsExitSubscribed,
      }));
    } else {
      return rejectWithValue({
        message: "Failed to fetch countries data or data is not an array",
      });
    }
  }
);

export const fetchLegsGeofenceApi = createAsyncThunk(
  "legs/fetchLegsApi",
  async (payload, { rejectWithValue }) => {
    try {
      const { legTypeIds, userIds, produceIds } = payload;

      const requestPayload = {
        legTypeIds, // ✅ Must be an array of numbers
        userIds, // ✅ array
        produceIds, // ✅ array
      };

      const { success, data } = await getLegsGeofencesSubscriptionApi(
        requestPayload
      );

      if (success) {
        return {
          legTypeIds,
          data: data.map((item) => ({
            ...item,
            LegTypeSubscriptions: item.LegTypeSubscriptions.map((sub) => ({
              ...sub,
              isChecked: false,
            })),
          })),
        };
      } else {
        return rejectWithValue({ message: "Failed to fetch legs data" });
      }
    } catch (error) {
      return rejectWithValue({ message: error.message || "API error" });
    }
  }
);
