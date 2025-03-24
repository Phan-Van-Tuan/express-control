import axios, { AxiosResponse } from "axios";
import storage, { KEYSTORE } from "./storage";
import ErrorHandler from "./errorHandler";

const API_URL: string | undefined =
  process.env.APP_API_URL || "http://localhost:0911";
// console.log(API_URL);

const axiosRequest = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

const errorHandler = new ErrorHandler();

// Interceptor cho request
axiosRequest.interceptors.request.use(
  (config) => {
    const token = storage.get(KEYSTORE.ACCESS_TOKEN); // Lấy token động
    console.group("REQUEST");
    console.log("Sending request to:", config.url);
    console.log("With token:", token);
    console.log("Headers:", config.headers);
    console.groupEnd();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"]; // Xóa header nếu không có token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosRequest.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const categorizedError = errorHandler.handleError(error);
    if (categorizedError.status === 401 || categorizedError.status === 403) {
      console.log("Unauthorized or Forbidden, clearing token...");
      storage.remove(KEYSTORE.ACCESS_TOKEN);
      storage.remove(KEYSTORE.REFRESH_TOKEN);
      delete axiosRequest.defaults.headers.common["Authorization"];
    }
    return Promise.reject(categorizedError);
  }
);

export default axiosRequest;
