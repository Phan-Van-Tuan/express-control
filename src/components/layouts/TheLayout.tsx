import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MemoizedSidebar = memo(Sidebar);
const MemoizedHeader = memo(Header);

const TheLayout: React.FC = () => {
  return (
    <>
      <MemoizedSidebar />
      <div className="sm:ml-64 flex flex-col flex-1">
        <MemoizedHeader />
        <main className=" m-4 flex flex-col flex-1 justify-between">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default TheLayout;
