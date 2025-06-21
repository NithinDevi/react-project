import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:5000/api";

const USER_TOKEN = "6fdbec2c-3737-4d87-ac38-7c670c31e9c8";

const SECURITY_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDU4NzkzNDksIlVzZXJUb2tlbiI6IjZmZGJlYzJjLTM3MzctNGQ4Ny1hYzM4LTdjNjcwYzMxZTljOCJ9.v8Bm2C5RJZkDDl8rfChVe6L4t2GH54m4LL5m5vx4vSY";

// Update the headers based on requirement
export const fetchCall = async (
  url = "",
  method = "GET",
  data = undefined,
  headers = {}
) => {
  try {
    const response = await axios({
      method: method,
      url: BASE_URL + url,
      headers: {
        ...headers,
        userToken: USER_TOKEN,
        securityToken: SECURITY_TOKEN,
      },
      data,
    });

    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, message: err.message, data: null };
  }
};
