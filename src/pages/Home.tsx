import React from "react";
import Sidebar from "../components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "./main/Logout";
import CreateTrip from "./main/CreateTrip";
import Dashboard from "./main/Dashboard";

const Home: React.FC = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/create-trip" element={<CreateTrip />} />
              <Route path="/*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
