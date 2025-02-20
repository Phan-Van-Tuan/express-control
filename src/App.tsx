/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div className="App bg-slate-100 dark:bg-gray-900 flex flex-col">
        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
};

export default App;
