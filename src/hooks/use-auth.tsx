import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IUser } from "../types/account.types";
import { queryClient, getQueryFn } from "../lib/queryClient";
import { storage } from "../lib/storage";
import { ILoginRequest, ILoginResponse } from "../types/auth.type";
import api from "../lib/queryClient";

type AuthContextType = {
  user: IUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<
    Omit<ILoginResponse, "password">,
    Error,
    ILoginRequest
  >;
  logoutMutation: UseMutationResult<void, Error, void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<IUser | null, Error>({
    queryKey: ["/auth/profile/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: ILoginRequest) => {
      const response = await api.post("/auth/login/admin", {
        ...credentials,
        role: "admin",
      });
      return response.data;
    },
    onSuccess: (userData: ILoginResponse) => {
      storage.set("ACCESS_TOKEN", userData.accessToken);
      storage.set("REFRESH_TOKEN", userData.refreshToken);
      queryClient.setQueryData(["/auth/profile/me"], userData.user);
      toast.success("Login successful");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.get("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      storage.remove("ACCESS_TOKEN");
      storage.remove("REFRESH_TOKEN");
      queryClient.setQueryData(["/auth/profile/me"], null);
      toast.success("Logged out successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Logout failed");
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
