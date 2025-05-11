import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import router from "../routers";
import { AuthProvider } from "../hooks/use-auth";
import { queryClient } from "../lib/queryClient";
import { LanguageProvider } from "../hooks/use-language";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <div className="App bg-slate-100 dark:bg-gray-900 flex flex-col text-gray-600 dark:text-gray-300 font-outfit">
            <ToastContainer autoClose={2000} limit={1} />
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
