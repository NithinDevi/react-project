import { fetchCall } from "./api";

export const getParentOrgApi = async (rowIds) => {
  return await fetchCall(
    "/alertevent/1.0/ParentOrgsByProduceIds",
    "POST",
    rowIds
  );
};

export const getProduceTypesApi = async () => {
  return await fetchCall("/alertevent/1.0/AllProduce/", "GET");
};

export const getUserApi = async (rowIds) => {
  return await fetchCall(
    "/AlertEvent/1.0/ActiveUsersByMultipleOrgId",
    "POST",
    rowIds
  );
};

export const getLegsApi = async (data) => {
  return await fetchCall("/AlertEvent/AllLegsSubscriptions", "POST", data);
};

export const getLegsGeofencesSubscriptionApi = async (data) => {
  return await fetchCall(
    "/AlertEvent/LegsGeofencesSubscription ",
    "POST",
    data
  );
};

export const getCountriesApi = async () => {
  return await fetchCall(
    "/AlertEvent/AllCountrySubscriptionsForUsers/",
    "POST",
    [1323, 683]
  );
};

// export const getParentOrgs = async () => {
//     const userToken = "6fdbec2c-3737-4d87-ac38-7c670c31e9c8";
//     const securityToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDUyNTQzNTgsIlVzZXJUb2tlbiI6IjZmZGJlYzJjLTM3MzctNGQ4Ny1hYzM4LTdjNjcwYzMxZTljOCJ9.PbsQx5Vx_BXbW91FOi6CwVMmJQCR6mM_wluzPQe26BI"

//     try {
//         const response = await axios.get(`${BASE_URL}api/organization/1.0/ParentOrgsByProduceIds`,{
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 userToken,
//                 securityToken,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("API Error:", error.response?.status, error.response?.data);
//         throw error;
//     }
// };
