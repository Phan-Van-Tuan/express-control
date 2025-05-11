import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/account.types";

// Định nghĩa state của store
interface State {
  accounts: IUser[];
  counts: {
    rider: {
      unverified: number;
      active: number;
      banned: number;
    };
    driver: {
      pending: number;
      active: number;
      banned: number;
    };
    system: {
      owner: number;
      admin: number;
      support: number;
    };
    riders: number;
    drivers: number;
    systems: number;
    total: number;
  };
  setAccounts: (data: IUser[]) => void;
  resetConfig: () => void;
}

const initCounts = {
  rider: {
    unverified: 0,
    active: 0,
    banned: 0,
  },
  driver: {
    pending: 0,
    active: 0,
    banned: 0,
  },
  system: {
    owner: 0,
    admin: 0,
    support: 0,
  },
  riders: 0,
  drivers: 0,
  systems: 0,
  total: 0,
};

// Tạo store với persist middleware để cache
export const useAccountStore = create<State>()(
  persist(
    (set) => ({
      accounts: [],
      counts: initCounts,
      setAccounts: (data) => set({ accounts: data }),
      resetConfig: () => set({ accounts: [] }),
    }),
    {
      name: "account-storage", // Tên storage trong localStorage
      partialize: (state) => ({
        accounts: state.accounts,
      }),
    }
  )
);
