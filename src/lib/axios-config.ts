import axios from "axios";
import env from "../contants/env";
import { getToken, refresh } from "./auth-token";
import { IBaseResponse } from "../types/response.type";

// Create axios instance
const api = axios.create({
  baseURL: env.SERVER.API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Sending request to:", config.url, token?.length);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token (giả sử hàm này trả token mới)
        const newToken = await refresh();

        // Gắn token mới vào header
        // api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Retry lại request ban đầu
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const errorResponse: IBaseResponse<any> = {
      data: error,
      success: false,
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
    };
    console.log(`[LOG]: ${errorResponse.message}`);
    return Promise.reject(errorResponse);
  }
);

// Helper functions for API requests
export const request = {
  get: <T>(url: string, params?: any) =>
    api.get<T>(url, { params }).then((response) => response.data),

  post: <T>(url: string, data?: any) =>
    api.post<T>(url, data).then((response) => response.data),

  put: <T>(url: string, data?: any) =>
    api.put<T>(url, data).then((response) => response.data),

  delete: <T>(url: string) =>
    api.delete<T>(url).then((response) => response.data),
};

export default api;
