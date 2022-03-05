import React, { useEffect, useState } from "react";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import Layout from "../components/Layout";
import DashboardTitle from "../components/DashboardTitle";
import DeliveryRequestTable from "../components/DeliveryRequestTable";
// import { useSelector, useDispatch } from "react-redux";
// import { userSelector, clearState } from "../features/User/UserSlice";
// import Loader from "../assets/gif/loading.gif";
// import { useHistory } from "react-router-dom";

function Dashboard() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Dashboard actions */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Avatars */}
          <DashboardTitle title="Company Dashboard" />

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <button
              className="btn hover:text-yellow-500 text-gray border"
              style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden xs:block ml-2 mr-2">Last 30 Days</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">
          {/* Line chart (Acme Plus) */}
          {/* Total Revenue */}
          <DashboardCard01
            title="Total Revenue"
            figure="₦50,000"
            subtext="than last week"
            percent="50%"
          />
          {/* Pickup Request */}
          <DashboardCard01
            title="Active Agent"
            figure="50"
            subtext="than last week"
            percent="50%"
          />
          {/* Active Vehicles */}
          <DashboardCard01
            title="Active Vechicles"
            figure="50"
            subtext="than last week"
            percent="50%"
          />
          {/* Declince Rate */}
          <DashboardCard01
            title="Request decline rate"
            figure="50%"
            subtext="than last week"
            percent="50%"
          />

          {/* Revenue Analytics */}
          <DashboardCard08 title="Sales Over Time (all stores)" />
          {/* Pie Chart Shipment & Delivery */}
          <DashboardCard06 />
          {/* Card (top 5) */}
          <DeliveryRequestTable />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
