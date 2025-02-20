import React from "react";
import Sidebar from "../components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Notification from "./main/Notification";
import Dashboard from "./main/Dashboard";
import Logout from "./main/Logout";
import Inbox from "./main/Inbox";
import Financial from "./main/Financial";
import Event from "./main/Event";
import NotFound from "./NotFound";

const Home: React.FC = () => {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col flex-1">
        <Header />
        <main className=" m-4 flex flex-col flex-1 justify-between">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Financial />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/users" element={<Notification />} />
            <Route path="/events" element={<Event />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default Home;
