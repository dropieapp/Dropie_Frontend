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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top Countries</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PieChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
