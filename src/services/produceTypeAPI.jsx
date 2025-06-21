import axios from "axios";

// const BASE_URL = 'https://escavox-dev-webapi.azurewebsites.net';
// const USER_ID = "729";

// export const getProduceType = async () => {
//     const userToken = "6fdbec2c-3737-4d87-ac38-7c670c31e9c8";
//     const securityToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDUyNTIyMTgsIlVzZXJUb2tlbiI6IjZmZGJlYzJjLTM3MzctNGQ4Ny1hYzM4LTdjNjcwYzMxZTljOCJ9.AZ-lQ5Zq6fZG15K67SvXpkRMtlMWmGhjlcgOaPT4oXw"

//     try {
//         const response = await axios.get(`${BASE_URL}/api/organization/1.0/ParentOrgsByProduceIds`, {
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 userToken,
//                 securityToken,
//             },
//         });
//         console.log(":::::::20", response.data)
//         return response.data;
//     } catch (error) {
//         console.error("API Error:", error.response?.status, error.response?.data);
//         throw error;
//     }
// };
