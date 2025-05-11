import React, { memo, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "../../lib/utils";

const MemoizedSidebar = memo(Sidebar);
const MemoizedHeader = memo(Header);

const TheLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <MemoizedSidebar isOpen={sidebarOpen} />
      <div className={cn("flex flex-col flex-1", sidebarOpen && "sm:ml-64")}>
        <MemoizedHeader toggleSidebar={toggleSidebar} />
        <main className=" m-4 flex flex-col flex-1 justify-between">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default TheLayout;
