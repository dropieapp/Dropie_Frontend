import { Col, Row } from "antd";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import DashboardTitle from "../components/DashboardTitle";
import FormField from "../components/FormField";
import Layout from "../components/Layout";
import ImageUpload from "../components/ImageUpload";
// import CheckboxTable from "../components/CheckboxTable";
import images from "../assets/images/user-36-01.jpg";

import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import FormSelectField from "../components/FormSelectField";

function Deliveries() {
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  const arrayOfData = [
    {
      id: "1 - Cash",
      name: "Cash",
    },
    {
      id: "2 - Card",
      name: "Card",
    },
  ];
  const arrayOfData2 = [
    {
      id: "1 - On Time",
      name: "On Time",
    },
    {
      id: "2 - Late",
      name: "Late",
    },
  ];
  const arrayOfData3 = [
    {
      id: "1 - Amadi Chika",
      name: "Amadi Chika",
    },
    {
      id: "2 - Amadi Chika",
      name: "Amadi Chika",
    },
    {
      id: "3 - Amadi Chika",
      name: "Amadi Chika",
    },
    {
      id: "4 - Amadi Chika",
      name: "Amadi Chika",
    },
    {
      id: "5 - Amadi Chika",
      name: "Amadi Chika",
    },
    {
      id: "6 - Amadi Chika",
      name: "Amadi Chika",
    },
    {
      id: "7 - Amadi Chika",
      name: "Amadi Chika",
    },
    {
      id: "8 - Amadi Chika",
      name: "Amadi Chika",
    },
  ];
  const arrayOfData4 = [
    {
      id: "1 - Successful",
      name: "Successful",
    },
    {
      id: "2 - Returned",
      name: "Returned",
    },
    {
      id: "3 - In Transit",
      name: "In Transit",
    },
    {
      id: "4 - Failed",
      name: "Failed",
    },
  ];
  const arrayOfData5 = [
    {
      id: "1 - Motorcycle",
      name: "Motorcycle",
    },
    {
      id: "2 - Bus",
      name: "Bus",
    },
    {
      id: "3 - Car",
      name: "Car",
    },
    {
      id: "4 - Truck",
      name: "Truck",
    },
  ];
  const [selectedValue, setSelectedValue] = useState("Nothing selected");
  const handleSelectChange = useCallback(() => {
    setSelectedValue(selectedValue);
  });
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
              onClick={() => setShowModal(true)}
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
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative my-6 mx-auto w-auto w-96 md:w-96 lg:w-6/12">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-lg font-normal text-center text-black lg:text-2xl">
                          Create Order
                        </h3>
                        <button
                          type="button"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-toggle="defaultModal"
                          onClick={() => setShowModal(false)}
                        >
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {/*body*/}
                      <div class="py-4 px-8 bg-white rounded-lg my-10">
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <FormSelectField
                              arrayOfData={arrayOfData}
                              onSelectChange={handleSelectChange}
                              label="Delivery Type"
                              type="text"
                              id="delivery_type"
                              placeholder=""
                            />
                          </Col>
                          <Col span={12}>
                            <FormField
                              type="text"
                              label="Deliery Address"
                              id="text"
                              placeholder="Yaba"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <FormSelectField
                              arrayOfData={arrayOfData2}
                              onSelectChange={handleSelectChange}
                              label="Plan"
                              type="text"
                              id="plan"
                              placeholder=""
                            />
                          </Col>
                          <Col span={12}>
                            <FormSelectField
                              arrayOfData={arrayOfData3}
                              onSelectChange={handleSelectChange}
                              label="Assign Agent"
                              type="text"
                              id="assign_agent"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <FormField
                              type="text"
                              label="Pickup Address"
                              id="text"
                              placeholder="Ikeja"
                            />
                          </Col>
                          <Col span={12}>
                            <FormField
                              type="text"
                              label="Package Weight"
                              id="text"
                              placeholder="10m"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <FormSelectField
                              arrayOfData={arrayOfData4}
                              onSelectChange={handleSelectChange}
                              label="Status"
                              type="text"
                              id="status"
                              placeholder=""
                            />
                          </Col>
                          <Col span={12}>
                            <FormSelectField
                              arrayOfData={arrayOfData5}
                              onSelectChange={handleSelectChange}
                              label="Vehicle Type"
                              type="text"
                              id="vehicle_type"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                      </div>

                      {/* /body */}
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
        <DashboardCard08 title="Completed Deliveries" />

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
                    <div className="flex items-center">
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
                  <th className="yl uv yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold">Delivery Date</div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Sender Phone Number
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Sender's Address
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Reciever's Address
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Delivery Type
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <span className="ng">Menu</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm t_ lh">
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input
                          className="table-item tj"
                          checked
                          type="checkbox"
                        />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="text-left">1112334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Express</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Standard
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button
                      ref={trigger}
                      className="inline-flex justify-start items-start  text-slate-400 hover:text-slate-500 rounded-full"
                      aria-haspopup="true"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-expanded={dropdownOpen}
                    >
                      <Transition
                        className="origin-top-left mx-auto absolute top-auto min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                        // className="bg-white border border-slate-200 origin-top-left absolute min-w-44 py-1.5"
                        show={dropdownOpen}
                        enter="transition ease-out duration-200 transform"
                        enterStart="opacity-0 -translate-y-2"
                        enterEnd="opacity-100 translate-y-0"
                        leave="transition ease-out duration-200"
                        leaveStart="opacity-100"
                        leaveEnd="opacity-0"
                      >
                        <div
                          ref={dropdown}
                          onFocus={() => setDropdownOpen(true)}
                          onBlur={() => setDropdownOpen(false)}
                        >
                          <ul className="pt-0.5 pb-2 px-3 mb-1">
                            <li className="border-b py-1 border-slate-200">
                              <Link
                                className="font-medium text-sm  text-gray-400 hover:text-gray-600 flex items-center py-1 px-3"
                                to="/"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                <svg
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.3392 16.2188C16.3392 16.953 15.7425 17.5722 15.0084 17.5722H4.3592C3.62504 17.5722 3.02837 16.953 3.02837 16.2188V5.56967C3.02837 4.83551 3.62504 4.26051 4.3592 4.26051H10.5709V3.37384H4.3592C3.13587 3.37384 2.14087 4.34717 2.14087 5.57051V16.2188C2.14087 17.4422 3.13587 18.4588 4.3592 18.4588H15.0075C16.2309 18.4588 17.2259 17.4413 17.2259 16.2188V10.0288H16.3384V16.2188H16.3392Z"
                                    fill="#333333"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M17.3391 3.23884C16.6691 2.56801 15.4999 2.56801 14.8291 3.23884L8.87656 9.19134C8.8199 9.24801 8.77906 9.31968 8.7599 9.39718L8.13323 11.9063C8.09573 12.0572 8.1399 12.2172 8.2499 12.328C8.33406 12.4122 8.4474 12.458 8.56323 12.458C8.59906 12.458 8.6349 12.4538 8.67073 12.4447L11.1807 11.8172C11.2591 11.798 11.3299 11.7572 11.3866 11.7005L17.3391 5.74801C17.6741 5.41301 17.8591 4.96718 17.8591 4.49301C17.8591 4.01884 17.6749 3.57384 17.3391 3.23884ZM10.8466 10.9863L9.17323 11.4047L9.59156 9.73134L14.5157 4.80718L15.7707 6.06218L10.8466 10.9863ZM16.7116 5.12051L16.3982 5.43384L15.1432 4.17884L15.4566 3.86551C15.7916 3.53051 16.3766 3.53051 16.7116 3.86551C16.8791 4.03301 16.9716 4.25551 16.9716 4.49301C16.9716 4.73051 16.8791 4.95301 16.7116 5.12051Z"
                                    fill="#333333"
                                    fill-opacity="0.6"
                                  />
                                </svg>
                                <span className="pl-3">Edit</span>
                              </Link>
                            </li>
                            <li className="border-b py-1 rounded-lg border-slate-200">
                              <Link
                                className="font-medium text-sm text-gray-400 bg-slate-100 hover:text-gray-600 flex items-center py-1 px-3"
                                to="/"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                <svg
                                  width="19"
                                  height="13"
                                  viewBox="0 0 19 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.5 9.65967C11.4675 9.65967 13.0625 8.06468 13.0625 6.09717C13.0625 4.12965 11.4675 2.53467 9.5 2.53467C7.53249 2.53467 5.9375 4.12965 5.9375 6.09717C5.9375 8.06468 7.53249 9.65967 9.5 9.65967Z"
                                    fill="#333333"
                                  />
                                  <path
                                    d="M9.5 0.159668C3.5625 0.159668 0 6.06036 0 6.06036C0 6.06036 3.5625 12.0347 9.5 12.0347C15.4375 12.0347 19 6.09717 19 6.09717C19 6.09717 15.4375 0.159668 9.5 0.159668ZM9.5 10.8472C4.30469 10.8472 1.48438 6.09717 1.48438 6.09717C1.48438 6.09717 4.30469 1.34717 9.5 1.34717C14.6953 1.34717 17.5156 6.09717 17.5156 6.09717C17.5156 6.09717 14.6953 10.8472 9.5 10.8472Z"
                                    fill="#333333"
                                  />
                                </svg>
                                <span className="pl-3">View Delivery</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="font-medium text-sm text-gray-400 hover:text-gray-600 flex items-center py-1 px-3"
                                to="/"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                <svg
                                  width="18"
                                  height="19"
                                  viewBox="0 0 18 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_743_572)">
                                    <path
                                      d="M13.5 18.0347H4.5C4.05245 18.0347 3.62322 17.8569 3.30676 17.5404C2.99029 17.2239 2.8125 16.7947 2.8125 16.3472V5.65967C2.8125 5.51048 2.87176 5.36741 2.97725 5.26192C3.08274 5.15643 3.22582 5.09717 3.375 5.09717C3.52418 5.09717 3.66726 5.15643 3.77275 5.26192C3.87824 5.36741 3.9375 5.51048 3.9375 5.65967V16.3472C3.9375 16.4964 3.99676 16.6394 4.10225 16.7449C4.20774 16.8504 4.35082 16.9097 4.5 16.9097H13.5C13.6492 16.9097 13.7923 16.8504 13.8977 16.7449C14.0032 16.6394 14.0625 16.4964 14.0625 16.3472V5.65967C14.0625 5.51048 14.1218 5.36741 14.2273 5.26192C14.3327 5.15643 14.4758 5.09717 14.625 5.09717C14.7742 5.09717 14.9173 5.15643 15.0227 5.26192C15.1282 5.36741 15.1875 5.51048 15.1875 5.65967V16.3472C15.1875 16.7947 15.0097 17.2239 14.6932 17.5404C14.3768 17.8569 13.9476 18.0347 13.5 18.0347Z"
                                      fill="#333333"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M15.75 4.53467H2.25C2.10082 4.53467 1.95774 4.4754 1.85225 4.36992C1.74676 4.26443 1.6875 4.12135 1.6875 3.97217C1.6875 3.82298 1.74676 3.67991 1.85225 3.57442C1.95774 3.46893 2.10082 3.40967 2.25 3.40967H15.75C15.8992 3.40967 16.0423 3.46893 16.1477 3.57442C16.2532 3.67991 16.3125 3.82298 16.3125 3.97217C16.3125 4.12135 16.2532 4.26443 16.1477 4.36992C16.0423 4.4754 15.8992 4.53467 15.75 4.53467Z"
                                      fill="#333333"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M11.25 4.53467C11.1008 4.53467 10.9577 4.4754 10.8523 4.36992C10.7468 4.26443 10.6875 4.12135 10.6875 3.97217V2.28467H7.3125V3.97217C7.3125 4.12135 7.25324 4.26443 7.14775 4.36992C7.04226 4.4754 6.89918 4.53467 6.75 4.53467C6.60082 4.53467 6.45774 4.4754 6.35225 4.36992C6.24676 4.26443 6.1875 4.12135 6.1875 3.97217V1.72217C6.1875 1.57298 6.24676 1.42991 6.35225 1.32442C6.45774 1.21893 6.60082 1.15967 6.75 1.15967H11.25C11.3992 1.15967 11.5423 1.21893 11.6477 1.32442C11.7532 1.42991 11.8125 1.57298 11.8125 1.72217V3.97217C11.8125 4.12135 11.7532 4.26443 11.6477 4.36992C11.5423 4.4754 11.3992 4.53467 11.25 4.53467Z"
                                      fill="#333333"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M9 15.2222C8.85082 15.2222 8.70774 15.1629 8.60225 15.0574C8.49676 14.9519 8.4375 14.8089 8.4375 14.6597V6.78467C8.4375 6.63548 8.49676 6.49241 8.60225 6.38692C8.70774 6.28143 8.85082 6.22217 9 6.22217C9.14918 6.22217 9.29226 6.28143 9.39775 6.38692C9.50324 6.49241 9.5625 6.63548 9.5625 6.78467V14.6597C9.5625 14.8089 9.50324 14.9519 9.39775 15.0574C9.29226 15.1629 9.14918 15.2222 9 15.2222Z"
                                      fill="#333333"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M11.8125 14.0972C11.6633 14.0972 11.5202 14.0379 11.4148 13.9324C11.3093 13.8269 11.25 13.6839 11.25 13.5347V7.90967C11.25 7.76048 11.3093 7.61741 11.4148 7.51192C11.5202 7.40643 11.6633 7.34717 11.8125 7.34717C11.9617 7.34717 12.1048 7.40643 12.2102 7.51192C12.3157 7.61741 12.375 7.76048 12.375 7.90967V13.5347C12.375 13.6839 12.3157 13.8269 12.2102 13.9324C12.1048 14.0379 11.9617 14.0972 11.8125 14.0972Z"
                                      fill="#333333"
                                      fill-opacity="0.6"
                                    />
                                    <path
                                      d="M6.1875 14.0972C6.03832 14.0972 5.89524 14.0379 5.78975 13.9324C5.68426 13.8269 5.625 13.6839 5.625 13.5347V7.90967C5.625 7.76048 5.68426 7.61741 5.78975 7.51192C5.89524 7.40643 6.03832 7.34717 6.1875 7.34717C6.33668 7.34717 6.47976 7.40643 6.58525 7.51192C6.69074 7.61741 6.75 7.76048 6.75 7.90967V13.5347C6.75 13.6839 6.69074 13.8269 6.58525 13.9324C6.47976 14.0379 6.33668 14.0972 6.1875 14.0972Z"
                                      fill="#333333"
                                      fill-opacity="0.6"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_743_572">
                                      <rect
                                        width="18"
                                        height="18"
                                        fill="white"
                                        transform="translate(0 0.597168)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="pl-3">Remove Delivery</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Transition>
                      {/* </div> */}
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">11222334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-red-500">
                      Failed
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">1112334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-red-500">
                      Failed
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">11222334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Standard
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">1112334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Standard
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">1112334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-red-500">
                      Failed
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">1112334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-yellow-500">
                      In Transit
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">11222334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-yellow-500">
                      In Transit
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">1112334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">Joe Huang</div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-yellow-500">
                      In Transit
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">11222334</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        23rd Jan 2019, 10:45pm
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">09032411719</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Yaba</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-center">Standard</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-yellow-500">
                      In Transit
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Deliveries;
