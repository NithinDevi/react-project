import { filterHeaders } from "../../components/tableLayout/constants";

export const PRODUCE_TYPE = "produceType";
export const PARENT_ORG = "parentOrg";
export const USERS = "users";
export const LEGS = "legs";
export const COUNTRIES = "countries";

export const sectionsConfig = [
  {
    key: PRODUCE_TYPE,
    title: "Produce Type",
    apiResponse: [],
    headers: filterHeaders,
    apiKey: PRODUCE_TYPE,
  },
  {
    key: PARENT_ORG,
    title: "Parent Org",
    apiResponse: [],
    headers: filterHeaders,
    apiKey: PRODUCE_TYPE,
    // isExpandable: parentOrgs.rows.some((row) => row.isChecked),
  },
  {
    key: USERS,
    title: "Users",
    apiResponse: [],
    headers: filterHeaders,
    apiKey: PARENT_ORG,
  },
  {
    key: LEGS,
    title: "Legs",
    apiResponse: [],
    headers: filterHeaders,
    apiKey: USERS,
  },
  {
    key: COUNTRIES,
    title: "Countries",
    apiResponse: [],
    headers: filterHeaders.filter((header) => header.key === "EntrySubscribed"),
    apiKey: USERS,
  },
];

// console.log(
//   "filter_headers::",
//   filterHeaders,
//   filterHeaders.filter((header) => header.key === "EntrySubscribed")
// );
