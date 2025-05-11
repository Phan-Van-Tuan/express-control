import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { storage } from "./storage";
import env from "../contants/env";

export async function getToken() {
  try {
    const accessToken = storage.get("ACCESS_TOKEN");
    if (!accessToken) {
      console.info("Token does not exist!");
      return "";
    }
    if (isTokenExpired(accessToken)) {
      return await refresh();
    }
    return accessToken;
  } catch (error) {
    console.error("get token failed:", error);
    throw error;
  }
}

export async function refresh() {
  try {
    const refreshToken = storage.get("REFRESH_TOKEN");
    if (!refreshToken) throw new Error("Unable to get token!");
    if (isTokenExpired(refreshToken)) throw new Error("Invalid token!");
    const response = await axios
      .create({
        baseURL: env.SERVER.API,
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      })
      .post("/auth/refresh-token", {
        refreshToken,
      });
    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;
    storage.set("ACCESS_TOKEN", newAccessToken);
    storage.set("REFRESH_TOKEN", newRefreshToken);
    console.log("Set new token");
    return newAccessToken;
  } catch (error) {
    storage.remove("ACCESS_TOKEN");
    storage.remove("REFRESH_TOKEN");
    console.error("Refresh token failed:", error);
    throw error;
  }
}

interface JWTPayload {
  exp: number; // Expiration time (in seconds)
  [key: string]: any; // Các thông tin khác bạn có thể thêm nếu cần
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: JWTPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return decoded.exp < currentTime;
  } catch (error) {
    // Nếu decode lỗi, có thể token bị hỏng → coi như hết hạn
    console.warn("Invalid token:", error);
    return true;
  }
}
