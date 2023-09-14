import axios from "axios";
const baseURL = "https://accompanyingparents-production.up.railway.app";
export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {},
});
instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
