/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div className="App bg-slate-100 dark:bg-gray-900">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
};

export default App;
