import React from "react";
import PieChart from "../../charts/PieChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard06() {
  const chartData = {
    labels: ["On Time", "In Progress", "Delayed"],
    datasets: [
      {
        label: "Shipment & Deliveries",
        data: [60, 30, 10],
        backgroundColor: [
          tailwindConfig().theme.colors.orange[400],
          tailwindConfig().theme.colors.gray[400],
          tailwindConfig().theme.colors.gray[600],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.yellow[600],
          tailwindConfig().theme.colors.gray[700],
          tailwindConfig().theme.colors.gray[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-sm border" style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}>
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between">
        <h2 className="text-gray-800">Delivery Statics</h2>
        <button
          className="btn hover:text-yellow-500 text-gray border"
          style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
        >
          <span className="hidden xs:block ml-2 mr-2">This week</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PieChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
