import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
// import Icon from "../../assets/images/icon-01.svg";
import EditMenu from "../EditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import "../../css/custom.css";

function DashboardCard01(props) {
  const chartData = {
    labels: [
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
    ],
    datasets: [
      // Indigo line
      {
        data: [104, 104, 164, 164, 120, 120],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.orange[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.orange[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.orange[500],
        clip: 20,
      },
      // Gray line
      {
        data: [42, 243, 38, 120, 0, 0],
        borderColor: tailwindConfig().theme.colors.gray[300],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.gray[300],
        clip: 20,
      },
    ],
  };

  return (
    <div
      className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-sm rounded-sm border"
      style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
    >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="custom-font text-gray-800 mb-2">{props.title}</h2>
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>

        <div className="flex items-start">
          <div className="text-base font-bold text-gray-800 mr-2">
            {props.figure}
          </div>
        </div>
        <div className="text-xs text-gray-400 mb-1">
          <span style={{ color: "#D93804" }}>{props.percent}</span>{" "}
          {props.subtext}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={289} height={98} />
      </div>
    </div>
  );
}

export default DashboardCard01;
