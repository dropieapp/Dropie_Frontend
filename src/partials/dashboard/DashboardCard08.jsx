import React from "react";
import LineChart from "../../charts/LineChart02";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard08(props) {
  const chartData = {
    labels: [
      "01-01-2020",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
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
        data: [184, 86, 42, 378, 49, 243, 38],
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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">{props.title}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;
