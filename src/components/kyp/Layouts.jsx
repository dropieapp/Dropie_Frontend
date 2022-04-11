import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "../partials/Header";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import { useSelector, useDispatch } from "react-redux";
// import { retrieveAgents } from "../actions/staffs";
// import { retrieveFleets, vehicleType } from "../actions/fleets";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Layout;
