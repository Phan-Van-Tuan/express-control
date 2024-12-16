import axios from "axios";

const API_URL = "http://localhost:4500/api"; // Địa chỉ API của bạn

export const register = async (data: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
