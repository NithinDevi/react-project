import { combineReducers } from "redux";
import ProduceTypeReducer from "./produceTypeReducer";
import AlertReducer from "./alertSlice";
import ParentOrgReducer from "./parentOrgReducer";
import UserReducer from "./usersReducer";
import LegsReducer from "./legsReducer";
import CountriesReducer from "./countryReducer";

export const rootReducer = combineReducers({
  produceType: ProduceTypeReducer,
  alert: AlertReducer,
  parentOrg: ParentOrgReducer,
  users: UserReducer,
  legs: LegsReducer,
  countries: CountriesReducer,
});
