// src/services/userService.tsx
import axios from "axios";

const API_URL = "http://localhost:0911/api"; // Địa chỉ API của bạn

const callApi = async (endpoint: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = (data: {
  username: string;
  password: string;
  email: string;
}) => callApi("/auth/register", data);

export const login = (data: {
  phone: string;
  password: string;
  role: string;
}) => callApi("/auth/login", data);

export const logout = (data: {}) => callApi("/auth/logout", data);
