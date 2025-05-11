import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Assignment, Route } from "../types/base";

type State = {
  assignments: Assignment[];
  routes: Route[];
  setRoutes: (data: Route[]) => void;
  resetRoutes: () => void;
  setAssignments: (data: Assignment[]) => void;
  resetAssignments: () => void;
};

export const useRouteStore = create<State>()(
  persist(
    (set) => ({
      routes: [],
      assignments: [],
      setRoutes: (data) => set({ routes: data }),
      resetRoutes: () => set({ routes: [] }),
      setAssignments: (data) => set({ assignments: data }),
      resetAssignments: () => set({ assignments: [] }),
    }),
    {
      name: "route-storage",
      partialize: (state) => ({
        routes: state.routes,
        assignments: state.assignments,
      }),
    }
  )
);
