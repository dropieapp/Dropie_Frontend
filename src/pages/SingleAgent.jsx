import React, { useState, useCallback, useEffect, useRef } from "react";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createAgent, retrieveAgents } from "../actions/staffs";
import FlatButton from "../components/FlatButton";
import { clearMessage } from "../actions/message";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Tabs } from "antd";

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

Chart.register(...registerables);

const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "This Week",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(249, 123, 4, 0.15)",
      borderColor: "rgba(220, 36, 48, 0.85)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(220, 36, 48, 0.85)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(220, 36, 48, 0.85)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [5, 10, 15, 20, 10, 15, 30],
    },
  ],
};

function SingleAgent() {
  // const [show, setShow] = useState(null);
  // const dispatch = useDispatch();
  const location = useLocation();
  // const { message } = useSelector((state) => state.message);
  const singleInfo = location.state.agent;
  // console.log(singleInfo);

  return (
    <Layout>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <DashboardTitle title="Agent Dashboard" />
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Link to="/staffs">
            <button
              className="btn hover:text-yellow-500 text-gray-600 border h-8 px-4 text-sm"
              style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <span className="hidden xs:block ml-2 mr-2">Back</span>
            </button>
          </Link>
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* <p>{email}</p> */}
        {/* Total Revenue */}
        <div className="flex flex-col col-span-full sm:col-span-24 xl:col-span-24 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100 flex items-center">
            <h2 className="font-semibold text-slate-800">Package Deliveries</h2>
          </header>
          <div className="px-5 py-3">
            <div className="flex flex-wrap justify-between items-end">
              <Line data={data} width={595} height={170} />
            </div>
          </div>
        </div>
        <div
          class="py-4 px-8 flex flex-col col-span-full sm:col-span-24 xl:col-span-24border-slate-200 bg-white shadow-sm rounded-lg my-10 border"
          style={{
            borderColor: "rgba(197, 17, 4, 0.1)",
          }}
        >
          <Tabs defaultActiveKey="1" onChange={callback} className="custom-tab">
            <TabPane tab="Vehicle Info" key="1">
              <div className="my-10">
                <Row className="mt-2">
                  <Col span={24}>
                    <div className="text-left">
                      <img src={location.state.logo} alt="Agent Picture" />
                    </div>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col span={24}>
                    <div className="my-4">
                      <p className="text-lg font-bold">Personal Information</p>
                      <small>
                        Basic Information of the Driver on the Platform
                      </small>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col span={12} className="text-xs">
                    First Name:{" "}
                    <span className="text-sm">{singleInfo.first_name}</span>
                  </Col>
                  <Col span={12} className="text-xs">
                    Last Name:{" "}
                    <span className="text-sm">{singleInfo.last_name}</span>
                  </Col>
                  <Col span={12} className="text-xs mt-2">
                    Mobile Number:{" "}
                    <span className="text-sm">{singleInfo.phone_number}</span>
                  </Col>
                  <Col span={12} className="text-xs mt-2">
                    Email Address:{" "}
                    <span className="text-sm">{singleInfo.email}</span>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col span={24}>
                    <div className="my-4">
                      <p className="text-lg font-bold">
                        Additional Information
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-6">
                  <Col span={24} className="text-xs">
                    Current Location:{" "}
                    <span className="text-sm">
                      {singleInfo.default_pick_location}
                    </span>
                  </Col>
                </Row>

                <Row className="mt-6">
                  <Col span={24} className="text-xs">
                    Current Activity: <span className="text-sm">Driving</span>
                  </Col>
                </Row>
                <Row className="mt-6">
                  <Col span={24} className="text-sm">
                    Agent Rating: {singleInfo.rating}
                  </Col>
                </Row>
                <Row className="mt-6">
                  <Col span={24} className="text-sm">
                    Status:{" "}
                    {singleInfo.status === "active" ? (
                      <span className="font-medium text-md text-green-500">
                        Active
                      </span>
                    ) : (
                      <span className="font-medium text-md text-red-500">
                        Suspended
                      </span>
                    )}
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="Current Location" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Delivery History" key="3">
              {/* <CheckboxTable /> */}
              <div className="md:px-3 pt-4 md:pt-5 pb-5 overflow-x-auto">
                <table className="table-auto w-full">
                  {/* Table header */}
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Tracking ID</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Delivery Date</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Sender Phone Number</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Sender Address</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Reciever Address</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Delivery Type</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Status</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-center">...</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm divide-y divide-gray-100">
                    {singleInfo.delivery && singleInfo.delivery.length > 0 ? (
                      singleInfo.delivery.map((item, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-center">
                                {item.tracking_number}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-center">
                                {dateFormat(
                                  item.created_at,
                                  "dddd, mmmm dS, yyyy"
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-center">
                                {item.pickup_contact_number}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-center">
                                {item.pickup_address}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-center">
                                {item.delivery_address}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-center">
                                {item.delivery_type}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex">
                              <div className="text-left">{item.status}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-center">....</div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

export default SingleAgent;
