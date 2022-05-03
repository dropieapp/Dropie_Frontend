import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveAgents } from "../actions/staffs";
import { retrieveFleets, vehicleType } from "../actions/fleets";
import { retrieveInvoices } from "../actions/invoice";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [userCode, setUserCode] = useState("");
  const [userVerify, setUserVerify] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    // let onboard = JSON.parse(localStorage.getItem("onboard"));
    setUserCode(user.data);
    // if (!localStorage.getItem("onboard")) {
    //   return;
    // } else {
    //   setUserVerify(onboard.next);
    // }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveAgents());
    dispatch(retrieveFleets());
    dispatch(vehicleType());
    dispatch(retrieveInvoices());
  }, []);

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
            {userCode.business_id === null ? (
              <p className="bg-orange-900 text-white m-6 p-4">
                <Link to="/company-info">Verify account</Link>
              </p>
            ) : null}
            <div
              className=
              {
              "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto" 
                +
                (userCode.business_id === null ? "bg-gray-200 opacity-10" : "")
              }
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Layout;
