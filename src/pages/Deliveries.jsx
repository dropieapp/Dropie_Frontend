import { Col, Row } from "antd";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
// My Imports
import { useDispatch, useSelector } from "react-redux";
import { createDelivery } from "../actions/deliveries";
import dateFormat from "dateformat";
import {
  retrieveDeliveries,
  filterByStatus,
  filterByDate,
  getRiders,
} from "../actions/deliveries";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { clearMessage } from "../actions/message";

Chart.register(...registerables);

const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Dataset of Months",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

function Deliveries() {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [vehiclesType, setVehiclesType] = useState([]);

  useEffect(() => {
    let vehicle_type = JSON.parse(localStorage.getItem("vehicle_type"));
    setVehiclesType(vehicle_type.data);
  }, []);

  const getAgents = useSelector((state) => state.agentReducer.data);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  // data for the inputs
  const [deliveryType, setDeliveryType] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [frequency, setFrequency] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [packageCategory, setPackageCategory] = useState("");
  const [status, setStatus] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [deliveryContactName, setDeliveryContactName] = useState("");
  const [deliveryContactNumber, setDeliveryContactNumber] = useState("");
  const [description, setDescription] = useState("");

  // handle data for inputs
  const handleDeliveryType = (e) => {
    setDeliveryType(e.target.value);
  };
  const handleDeliveryAddress = (e) => {
    setDeliveryAddress(e.target.value);
  };
  const handleFrequency = (e) => {
    setFrequency(e.target.value);
  };
  const handleAssignedTo = (e) => {
    setAssignedTo(e.target.value);
  };
  const handlePickupAddress = (e) => {
    setPickupAddress(e.target.value);
  };
  const handlePackageCategory = (e) => {
    setPackageCategory(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleVehicleType = (e) => {
    setVehicleType(e.target.value);
  };
  const handleDeliveryContactName = (e) => {
    setDeliveryContactName(e.target.value);
  };
  const handleDeliveryContactNumber = (e) => {
    setDeliveryContactNumber(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const [delivery, setDelivery] = useState();

  //handle submit form data;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessage()); // clear message when changing location
    setSubmitted(true);
    setLoading(true);
    setSuccessful(false);
    const data = {
      delivery_type: deliveryType,
      delivery_address: deliveryAddress,
      frequency: frequency,
      assigned_to: assignedTo,
      pickup_address: pickupAddress,
      package_category: packageCategory,
      status: status,
      vehicle_type: vehicleType,
      delivery_contact_name: deliveryContactName,
      delivery_contact_number: deliveryContactNumber,
      description: description,
    };
    setDelivery(data);
  };

  // handle form submission
  useEffect(() => {
    if (submitted) {
      dispatch(createDelivery(delivery))
        .then(() => {
          setSubmitted(false);
          setLoading(false);
          setSuccessful(true);
          toast("Delivery created successfully", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          setSubmitted(false);
          setLoading(false);
          setSuccessful(false);
          toast("Error creating delivery", {
            type: "error",
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  }, [submitted, delivery]);

  // messages incase of errors or success
  const { message } = useSelector((state) => state.message);

  // retrive data from the database
  // const getDeliveries = useSelector((state) => state.deliveries.data);

  // const [currentDelivery, setCurrentDelivery] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");

  const deliveries = useSelector((state) => state.deliveries.data);

  const [viewDeilvery, setViewDeilvery] = useState({
    id: "",
    delivery_type: "",
    delivery_address: "",
    frequency: "",
    assigned_to: "",
    pickup_address: "",
    package_category: "",
    package_image: "",
    status: "",
    vehicle_type: "",
    delivery_contact_name: "",
    delivery_contact_number: "",
    description: "",
    valueItem: "",
    package_weight: "",
    noOfItems: "",
    agentInfo: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      work_status: "",
      default_pick_location: "",
    },
  });

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentDelivery(null);
    setCurrentIndex(-1);
  };

  const setActiveDelivery = (delivery, index) => {
    setCurrentDelivery(delivery);
    setCurrentIndex(index);
  };

  const handleViewDelivery = (delivery) => {
    // alert(delivery.id);
    setShowModal(true);
    setViewDeilvery({
      id: delivery.id,
      delivery_type: delivery.delivery_type,
      delivery_address: delivery.delivery_address,
      frequency: delivery.frequency,
      assigned_to: delivery.assigned_to,
      pickup_address: delivery.pickup_address,
      package_category: delivery.package_category,
      package_image: delivery.package_image,
      status: delivery.status,
      vehicle_type: delivery.vehicle_type,
      delivery_contact_name: delivery.delivery_contact_name,
      delivery_contact_number: delivery.delivery_contact_number,
      description: delivery.description,
      valueItem: delivery.value_of_item,
      package_weight: delivery.package_weight,
      noOfItems: delivery.number_of_item,
      agentInfo: {
        id: delivery.agent.id,
        first_name: delivery.agent.first_name,
        last_name: delivery.agent.last_name,
        email: delivery.agent.email,
        phone_number: delivery.agent.phone_number,
        address: delivery.agent.address,
        work_status: delivery.agent.work_status,
        default_pick_location: delivery.agent.default_pick_location,
      },
    });
  };

  const removeAllDeliveries = () => {
    dispatch(deleteAllDeliveries())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findDeliveriesByTitle(searchTitle));
  };
  const [visible, setVisible] = useState(false);

  return (
    <Layout>
      <div className="sm:px-6 pl-8 py-8 w-full max-w-9xl mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <DashboardTitle title="Deliveries" />
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <button
              className="btn hover:text-yellow-500 text-gray border h-8 px-4 text-sm"
              style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
            >
              <span className="hidden xs:block ml-2 mr-2 font-thin">
                This Month
              </span>
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
            <button
              className="btn hover:text-yellow-500 text-gray border h-8 px-4 text-sm"
              style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
            >
              <span className="hidden xs:block ml-2 mr-2 font-thin">
                Status
              </span>
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

            <button
              className="btn hover:text-white text-gray border h-8 px-4 text-sm"
              style={{
                backgroundColor: "#F97B04",
                color: "white",
                borderColor: "rgb(249, 123, 4, 0.2",
              }}
              onClick={() => {
                setVisible(true);
                dispatch(clearMessage());
                setSuccessful(false);
              }}
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>

            <Modal
              title="Create Order"
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1000}
            >
              <div class="py-4 px-8 bg-white rounded-lg my-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    {message && (
                      <div className="form-group">
                        <div
                          className={
                            successful
                              ? "p-4 my-3 text-black font-semibold bg-green-200"
                              : "p-4 my-3 text-red-500 font-semibold bg-red-200"
                          }
                          role="alert"
                        >
                          <ul className="mx-3 my-3">{message}</ul>
                        </div>
                      </div>
                    )}
                    {!successful && (
                      <div>
                        <Row className="mt-1" gutter={10}>
                          <Col span={12} className="gutter-row">
                            <label
                              className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                              htmlFor="delivery_type"
                            >
                              Delivery type
                            </label>
                            <select
                              id="delivery_type"
                              value={deliveryType}
                              onChange={handleDeliveryType}
                              name="delivery_type"
                              className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            >
                              <option value="">Select delivery type</option>
                              <option value="express">Express</option>
                              <option value="standard">Standard</option>
                            </select>
                          </Col>
                          <Col span={12} className="gutter-row">
                            <div className="form-group">
                              <InputField
                                type="text"
                                name="delivery_address"
                                label="Delivery Address"
                                value={deliveryAddress}
                                onChange={handleDeliveryAddress}
                                placeholder="Delivery Address"
                              />
                            </div>
                          </Col>
                          <Col span={12} className="gutter-row">
                            <label
                              className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                              htmlFor="frequency"
                            >
                              Plan
                            </label>
                            <select
                              id="frequency"
                              value={frequency}
                              onChange={handleFrequency}
                              name="frequency"
                              className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            >
                              <option value="">Select plan</option>
                              <option value="once">On Time</option>
                              <option value="recurring">Recurring</option>
                            </select>
                          </Col>
                          <Col span={12} className="gutter-row">
                            <label
                              className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                              htmlFor="assigned_to"
                            >
                              Assigned Agent
                            </label>
                            <select
                              id="assigned_to"
                              value={assignedTo}
                              onChange={handleAssignedTo}
                              name="assigned_to"
                              className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            >
                              <option value="">Select an Agent</option>
                              {getAgents &&
                                getAgents.map((agent) => (
                                  <option
                                    key={agent.key}
                                    value={`${agent.first_name} ${agent.last_name}`}
                                  >
                                    {agent.first_name} {agent.last_name}
                                  </option>
                                ))}
                            </select>
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              name="pickup_address"
                              label="Pickup Address"
                              value={pickupAddress}
                              onChange={handlePickupAddress}
                              placeholder="Pickup Address"
                            />
                          </Col>

                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              name="package_category"
                              label="Package Weight"
                              value={packageCategory}
                              onChange={handlePackageCategory}
                              placeholder="Package Category"
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <label
                              className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                              htmlFor="status"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              value={status}
                              onChange={handleStatus}
                              name="status"
                              className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            >
                              <option value>Status</option>
                              <option value="pending">Pending</option>
                              <option value="accepted">Accepted</option>
                              <option value="declined">Declined</option>
                              <option value="picked_up">Picked up</option>
                              <option value="delivering">Delivering</option>
                              <option value="delivered">Delivered</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </Col>
                          <Col span={12} className="gutter-row">
                            <label
                              className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                              htmlFor="vehicle_type"
                            >
                              Vehicle Type
                            </label>
                            <select
                              id="vehicle_type"
                              value={vehicleType}
                              onChange={handleVehicleType}
                              name="vehicle_type"
                              className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            >
                              <option value="">Select a Vehicle Type</option>

                              {vehiclesType.map((vehicle) => (
                                <option key={vehicle.key} value={vehicle.type}>
                                  {vehicle.type}
                                </option>
                              ))}
                            </select>
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              name="delivery_contact_name"
                              label="Delivery Contact Name"
                              value={deliveryContactName}
                              onChange={handleDeliveryContactName}
                              placeholder="Delivery Contact Name"
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              name="delivery_contact_number"
                              label="Delivery Contact Number"
                              value={deliveryContactNumber}
                              onChange={handleDeliveryContactNumber}
                              placeholder="Delivery Contact Number"
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              name="description"
                              label="Description"
                              value={description}
                              onChange={handleDescription}
                              placeholder="Description"
                            />
                          </Col>
                        </Row>
                        <button
                          className={`relative w-full flex justify-center my-7 bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                        >
                          {loading && (
                            // <span className="spinner-border spinner-border-sm mr-1"></span>
                            <svg
                              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                              ></circle>
                              <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          )}
                          Create an Order
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
        {/* <DashboardCard08 title="Completed Deliveries" /> */}
        <div className="flex flex-col col-span-full sm:col-span-24 xl:col-span-24 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100 flex items-center">
            <h2 className="font-semibold text-slate-800">
              Completed Deliveries
            </h2>
          </header>
          <div className="px-5 py-3">
            <div className="flex flex-wrap justify-between items-end">
              <Line data={data} width={595} height={170} />
            </div>
          </div>
        </div>

        {/* <MyChart/> */}

        <div
          class="py-4 px-8 bg-white shadow-sm rounded-lg my-10 border"
          style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
        >
          {/* <CheckboxTable /> */}{" "}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="vj font-semibold uppercase text-gray-500 border-t-2 border-b-2 border-gray-200">
                <tr>
                  <th className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex text-left">
                      <label className="inline-flex">
                        <span className="ng">Select all</span>{" "}
                        <input
                          id="parent-checkbox"
                          className="tj"
                          type="checkbox"
                        />
                      </label>
                    </div>
                  </th>
                  <th className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Tracking ID</div>
                  </th>

                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Assigned Rider
                    </div>
                  </th>

                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Sender Phone Number
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Sender Address
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Reciever Address
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Delivery Date</div>
                  </th>

                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">MENU</div>
                  </th>
                </tr>
              </thead>
              {deliveries && deliveries.length > 0 ? (
                deliveries.map((delivery, index) => (
                  <tbody className="text-sm t_ lh">
                    <tr key={index}>
                      <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                        <div className="flex text-left">
                          <label className="inline-flex">
                            <span className="ng">Select</span>{" "}
                            <input className="table-item tj" type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                        <div className="text-left">
                          {delivery.tracking_number}
                        </div>
                      </td>
                      <td className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="flex text-left">
                          <div className="font-medium text-gray-800">
                            {delivery.agent.first_name}{" "}
                            {delivery.agent.last_name}
                          </div>
                        </div>
                      </td>
                      <td className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="text-left">
                          {delivery.delivery_contact_number}
                        </div>
                      </td>
                      <td className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="text-left">
                          {delivery.pickup_address}
                        </div>
                      </td>
                      <td className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="text-left">
                          {delivery.delivery_address}
                        </div>
                      </td>
                      <td className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">
                          {delivery.status}
                        </div>
                      </td>

                      <td className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="text-left ">
                          {dateFormat(
                            delivery.created_at,
                            "dddd, mmmm dS, yyyy"
                          )}
                        </div>
                      </td>
                      <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-center">
                            {show == index ? (
                              <button
                                onClick={() => setShow(null)}
                                className="focus:outline-none pl-7"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                                    stroke="#A1A1AA"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                                    stroke="#A1A1AA"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                                    stroke="#A1A1AA"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() => setShow(index)}
                                className="focus:outline-none pl-7"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                                    stroke="#A1A1AA"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                                    stroke="#A1A1AA"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                                    stroke="#A1A1AA"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            )}
                            {show == index && (
                              <div className="dropdown-content bg-white shadow w-52 absolute z-30 right-11 m ">
                                <div className=" w-full hover:bg-orange-200 cursor-pointer hover:text-white">
                                  <button
                                    className="flex py-3 px-2"
                                    onClick={() => {
                                      handleViewDelivery(delivery);
                                    }}
                                  >
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.3392 15.6217C16.3392 16.3558 15.7425 16.975 15.0084 16.975H4.3592C3.62504 16.975 3.02837 16.3558 3.02837 15.6217V4.97251C3.02837 4.23834 3.62504 3.66334 4.3592 3.66334H10.5709V2.77667H4.3592C3.13587 2.77667 2.14087 3.75001 2.14087 4.97334V15.6217C2.14087 16.845 3.13587 17.8617 4.3592 17.8617H15.0075C16.2309 17.8617 17.2259 16.8442 17.2259 15.6217V9.43167H16.3384V15.6217H16.3392Z"
                                        fill="#333333"
                                      />
                                      <path
                                        d="M17.3391 2.64166C16.6691 1.97083 15.4999 1.97083 14.8291 2.64166L8.87656 8.59416C8.8199 8.65083 8.77906 8.72249 8.7599 8.79999L8.13323 11.3092C8.09573 11.46 8.1399 11.62 8.2499 11.7308C8.33406 11.815 8.4474 11.8608 8.56323 11.8608C8.59906 11.8608 8.6349 11.8567 8.67073 11.8475L11.1807 11.22C11.2591 11.2008 11.3299 11.16 11.3866 11.1033L17.3391 5.15083C17.6741 4.81583 17.8591 4.36999 17.8591 3.89583C17.8591 3.42166 17.6749 2.97666 17.3391 2.64166ZM10.8466 10.3892L9.17323 10.8075L9.59156 9.13416L14.5157 4.20999L15.7707 5.46499L10.8466 10.3892ZM16.7116 4.52333L16.3982 4.83666L15.1432 3.58166L15.4566 3.26833C15.7916 2.93333 16.3766 2.93333 16.7116 3.26833C16.8791 3.43583 16.9716 3.65833 16.9716 3.89583C16.9716 4.13333 16.8791 4.35583 16.7116 4.52333Z"
                                        fill="#333333"
                                      />
                                    </svg>

                                    <span className=" ml-2 mr-2 font-thin">
                                      View Delivery
                                    </span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-lg font-bold py-4"
                  >
                    No Delivery
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
      <Modal
        title="View Delivery"
        centered
        visible={showModal}
        onOk={() => setVisible(false)}
        onCancel={() => setShowModal(false)}
        width={1000}
      >
        <div class="px-8 bg-white rounded-lg">
          <div>
            <div className="flex justify-between mb-10">
              <img
                src={
                  "https://apibeta.dropie.ng/storage/" +
                  viewDeilvery.package_image
                }
                alt="Pacakeg Image"
              />
            </div>
            <div className="mb-20">
              <Row className="mt-2">
                <Col span={12} className="text-md">
                  Price Item:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.valueItem}
                  </span>
                </Col>
                <Col span={12} className="text-md">
                  Name of Sender:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.delivery_contact_name}
                  </span>
                </Col>
                <Col span={12} className="text-md mt-2">
                  Frequency:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.frequency}
                  </span>
                </Col>
                <Col span={12} className="text-md mt-2">
                  Sender Phone Number:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.delivery_contact_number}
                  </span>
                </Col>
              </Row>
            </div>
            <div className="mb-20">
              <Row className="mt-2">
                <Col span={12} className="text-md">
                  Delivery Type:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.delivery_type}
                  </span>
                </Col>
                <Col span={12} className="text-md">
                  Name of Reciever:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.agentInfo.first_name}{" "}
                    {viewDeilvery.agentInfo.last_name}
                  </span>
                </Col>
                <Col span={12} className="text-md mt-2">
                  Package Weight:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.package_weight} KG
                  </span>
                </Col>
                <Col span={12} className="text-md mt-2">
                  Reciever Phone Number:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.agentInfo.phone_number}
                  </span>
                </Col>
              </Row>
            </div>
            <div className="mb-10">
              <Row className="mt-2">
                <Col span={12} className="text-md">
                  Number of Items:{" "}
                  <span className="text-md font-bold">
                    {viewDeilvery.noOfItems}
                  </span>
                </Col>
              </Row>
            </div>
            <div className="mb-10 w-full py-10 px-4">
              {/* package description */}
              <span className="text-md font-bold">Package Description:</span>
              <div className="mt-2">
                <span className=" text-md  bg-yellow-200 text-gray-700 w-full">
                  {viewDeilvery.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default Deliveries;
