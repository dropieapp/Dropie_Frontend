import React from "react";
import LineChart from "../../charts/LineChart02";

// Import utilities
// import { tailwindConfig } from "../../utils/Utils";

function DashboardCard08() {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
    ],
    datasets: [
      // Indigo line
      {
        label: "Current",
        data: [73, 64, 73, 69, 104, 104, 164],
        borderColor: "rgb(149, 149, 149)",
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: "rgb(149, 149, 149)",
      },
      // Blue line
      {
        label: "Previous",
        data: [184, 86, 42, 378, 42, 243, 38],
        borderColor: "rgb(237, 214, 194)",
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: "rgb(237, 214, 194)",
      },
      // Green line
    ],
  };

  return (
    <div
      className="flex flex-col col-span-full sm:col-span-8 bg-white shadow-sm rounded-sm border"
      style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
    >
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between">
        <h2 className="text-gray-800">Revenue Analytics</h2>
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
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;
