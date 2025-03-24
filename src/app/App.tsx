import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "./App.css";
import router from "../routers";
import { RootState } from "../lib/store";
import GeneralLoading from "../components/base/GeneralLoading";
import { AuthProvider } from "../lib/auth/provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Dữ liệu được coi là "tươi" trong 5 phút
      gcTime: 30 * 60 * 1000, // Dữ liệu được lưu trong cache 30 phút
    },
  },
});

const App: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="App bg-slate-100 dark:bg-gray-900 flex flex-col">
          <GeneralLoading isLoading={isLoading} />
          <ToastContainer autoClose={2000} limit={1} />
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
