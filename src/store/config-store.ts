// store/useConfigStore.ts
import { create } from "zustand";

export type AppConfig = {
  _id: string;
  value: number;
  type:
    | "standard_price"
    | "premium_price"
    | "vip_price"
    | "tax"
    | "app_fee"
    | "min_price";
  info?: string;
  condition?: string;
};

type State = {
  configs: AppConfig[] | null;
  setConfig: (data: AppConfig[]) => void;
  resetConfig: () => void;
};

export const useConfigStore = create<State>((set) => ({
  configs: null,
  setConfig: (data) => set({ configs: data }),
  resetConfig: () => set({ configs: null }),
}));
