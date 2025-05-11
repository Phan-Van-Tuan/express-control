import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/account.types";

type AuthState = {
  user: Omit<IUser, "password"> | null;
  accessToken: string | null;
  setUser: (user: Omit<IUser, "password"> | null) => void;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "carpool-admin-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
