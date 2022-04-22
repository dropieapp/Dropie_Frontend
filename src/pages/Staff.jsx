import React, { useState, useCallback, useEffect, useRef } from "react";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import { Col, Modal, Row } from "antd";
import DashboardCard15 from "../partials/dashboard/DashboardCard15";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard100 from "../partials/dashboard/DashboardCard100";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import {
  createAgent,
  retrieveAgent,
  retrieveAgents,
  updateAgentStatus,
} from "../actions/staffs";
import FlatButton from "../components/FlatButton";
import { clearMessage } from "../actions/message";
import { toast } from "react-toastify";

function Staff() {
  const [show, setShow] = useState(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeloading, setActiveLoading] = useState(false);
  const [deactiveloading, setDeactiveLoading] = useState(false);
  const [isSubmiited, setIsSubmitted] = useState(false);
    const [visible, setVisible] = useState(false);


  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const [inputValue, setInputValue] = useState({
    first_name: "",
    last_name: "",
    other_name: "",
    lga: "",
    address: "",
    employment_date: "",
    land_mark: "",
    phone_number: "",
    transaction_pin: "",
    default_pick_location: "",
    email: "",
  });
  const {
    first_name,
    last_name,
    other_name,
    lga,
    address,
    employment_date,
    land_mark,
    phone_number,
    transaction_pin,
    default_pick_location,
    email,
  } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadIdCard = (e) => {
    setSelectedFile1(e.target.files[0]);
  };
  const uploadProfilePic = (e) => {
    setSelectedFile2(e.target.files[0]);
  };
  const [allInputs, setAllInputs] = useState();

  // onsubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    const formData = new FormData();
    Object.entries(inputValue).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("profile_photo", selectedFile2);
    formData.append("id_card", selectedFile1);

    setAllInputs(formData);

    setLoading(true);
    setIsSubmitted(true);
    setSuccessful(false);
    dispatch(clearMessage()); // clear message when changing location
  };

  useEffect(() => {
    if (isSubmiited) {
      localStorage.removeItem("add_agents");
      dispatch(createAgent(allInputs))
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          setIsSubmitted(false);
          setInputValue({
            first_name: "",
            last_name: "",
            other_name: "",
            lga: "",
            address: "",
            employment_date: "",
            land_mark: "",
            phone_number: "",
            transaction_pin: "",
            default_pick_location: "",
            email: "",
          });
          toast("Agent added successfully", {
            type: "success",
            autoClose: 3000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setSelectedFile1(null);
          setSelectedFile2(null);
         
        })
        .catch(() => {
          setLoading(false);
          setSuccessful(false);
          setIsSubmitted(false);
          toast("Error adding agent", {
            type: "error",
            autoClose: 3000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
      } else {
        setLoading(false);
      }
      localStorage.removeItem("get_agents");
      dispatch(retrieveAgents());
    return () => {
      // dispatch(clearMessage());
      setInputValue({});
      setSelectedFile1(null);
      setSelectedFile2(null);
    };
  }, [isSubmiited, dispatch, allInputs]);

  // const [getAgents, setGetAgents] = useState([]);

  const getAgents = useSelector((state) => state.agentReducer.data);

  // useEffect(() => {

  //   setGetAgents(get_agents.data);
  // }, []);

  // Handle Edit Button
  const navigate = useNavigate();
  const [successfulEdit, setSuccessfulEdit] = useState(false);
  const [singleAgent, setSingleAgent] = useState([]);

  const handleEdit = (item) => {
    setSuccessfulEdit(true);
    // alert(JSON.stringify(item));
    setSingleAgent(item);
  };

  useEffect(() => {
    if (successfulEdit) {
      setSuccessfulEdit(false);
      navigate("/staffs/" + singleAgent.id + "/edit-agent", {
        state: {
          agent: singleAgent,
        },
      });
    }
  }, [successfulEdit, singleAgent]);

  //handle activate status

  const [status, setStatus] = useState();
  const [agentId, setAgentId] = useState();
  const [isActive, setIsActive] = useState(false);

  const activateStatus = (item) => () => {
    setAgentId(item.id);
    setStatus("active");
    setIsActive(true);
    setActiveLoading(true);
  };

  const deactivateStatus = (item) => () => {
    setAgentId(item.id);
    setStatus("suspended");
    setIsActive(true);
    setDeactiveLoading(true);
  };

  useEffect(() => {
    if (isActive) {
      const data = {
        status: status,
      };
      dispatch(updateAgentStatus(agentId, data))
        .then(() => {
          setIsActive(false);
          setActiveLoading(false);
          setDeactiveLoading(false);
          setStatus("");
          setShow(null);
          toast("Agent status Updated", {
            type: "success",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          localStorage.removeItem("get_agents");
          dispatch(retrieveAgents());
        })
        .catch(() => {
          setIsActive(false);
          setShow(null);
          setActiveLoading(false);
          setDeactiveLoading(false);
          setStatus("");
          toast("Error updating agent status", {
            type: "error",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        });
    }
  }, [isActive]);

  return (
    <Layout>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <DashboardTitle title="HR/Staff Management" />
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
            <span className="hidden xs:block ml-2 mr-2 font-thin">Status</span>
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
            title="Add Agent"
            centered
            visible={visible}
            // onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            <div class="px-8 bg-white rounded-lg">
              <div>
                <form
                  name="form-signup"
                  id="form-signup"
                  encType="multipart/form-data"
                  onSubmit={(e) => handleSubmit(e)}
                >
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
                      {successful ? (
                        <Link
                          to={{
                            pathname: "/fleet-management",
                            state: { showModal },
                          }}
                        >
                          {" "}
                          <FlatButton text="Assign Fleet" />
                        </Link>
                      ) : null}
                    </div>
                  )}
                  {!successful && (
                    <div>
                      <div class="py-4 px-8 bg-white rounded-lg my-10">
                        <Row className="mt-5" gutter={16}>
                          <Col span={12}>
                            <InputField
                              type="text"
                              value={first_name}
                              placeholder="Makanbi"
                              label="First Name"
                              name="first_name"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col span={12}>
                            <InputField
                              type="text"
                              value={last_name}
                              label="Last Name"
                              placeholder="Josh AB"
                              name="last_name"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12}>
                            <InputField
                              type="text"
                              value={other_name}
                              name="other_name"
                              label="Other Name"
                              placeholder="Makanbi"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={phone_number}
                              name="phone_number"
                              label="Phone Number"
                              placeholder="08112345678"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={lga}
                              name="lga"
                              label="Local Goverment"
                              placeholder="Ikeja"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={address}
                              name="address"
                              onChange={handleChange}
                              label="Address"
                              placeholder="Ebitu Ukiwe"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={email}
                              name="email"
                              label="Email"
                              placeholder="josh@email.com"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="date"
                              value={employment_date}
                              name="employment_date"
                              label="Employment Date"
                              placeholder="Employment Date"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>

                        <Row className="mt-5" gutter={16}>
                          <Col span={12}>
                            <div class="text-gray-700">
                              <label className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2 ">
                                I.D Card
                              </label>
                              <input
                                type="file"
                                name="id_card"
                                onChange={uploadIdCard}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                          </Col>
                          <Col span={12}>
                            <div class="text-gray-700">
                              <label className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2 ">
                                Profile Picture
                              </label>
                              <input
                                type="file"
                                name="profile_photo"
                                onChange={uploadProfilePic}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={land_mark}
                              name="land_mark"
                              label="Land Mark"
                              placeholder="NCDC"
                              onChange={handleChange}
                            />
                          </Col>

                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={default_pick_location}
                              name="default_pick_location"
                              label="Default Pickup Location"
                              placeholder="Nasarawa"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={transaction_pin}
                              name="transaction_pin"
                              label="Transaction Pin"
                              placeholder="3832"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                        <button
                          className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
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
                          Add Agent
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </Modal>
         
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* <p>{email}</p> */}
        {/* Total Revenue */}
        <DashboardCard15
          title="Total Active Agents"
          figure="50"
          subtext="than last week"
          percent="50%"
        />
        {/* Total Revenue */}
        <DashboardCard15
          title="Total Inactive Agents"
          figure="50"
          subtext="than last week"
          percent="50%"
        />

        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Agent List</h2>
          </header>
          <div className="p-3">
            <div className="md:px-10 pt-4 md:pt-7 pb-5 overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="text-left">Agent Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="text-left">Current Location</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="text-left">Assigned Vehicle</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="text-left">Agent Rating</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="text-left">Agent Phone Number</div>
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
                  {getAgents && getAgents.length > 0 ? (
                    getAgents.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-center">
                              {item.first_name} {item.last_name}{" "}
                              {item.other_name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-center">
                              {item.default_pick_location}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-center">
                              {item && item.fleet === null ? (
                                <p>Fleet Not Yet Assigned</p>
                              ) : (
                                <div>{item.fleet.name}</div>
                              )}{" "}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-center">{item.rating}</div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-center">
                              {item.phone_number}
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
                                      onClick={() => handleEdit(item)}
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
                                        Edit
                                      </span>
                                    </button>
                                  </div>
                                  <div className=" w-full hover:bg-orange-200 cursor-pointer hover:text-white">
                                    <button
                                      className="flex py-3 px-2"
                                      onClick={activateStatus(item)}
                                    >
                                      {activeloading && activeloading ? (
                                        // <span className="spinner-border spinner-border-sm mr-1"></span>
                                        <svg
                                          class="animate-spin -ml-1 mr-3 h-5 w-5"
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
                                      ) : (
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
                                      )}

                                      <span className=" ml-2 mr-2 font-thin">
                                        Activate Agent
                                      </span>
                                    </button>
                                  </div>
                                  <div className=" w-full text-gray-300 hover:bg-orange-200 cursor-pointer hover:text-white">
                                    <button
                                      className="flex py-3 px-2"
                                      onClick={deactivateStatus(item)}
                                    >
                                      {deactiveloading && deactiveloading ? (
                                        // <span className="spinner-border spinner-border-sm mr-1"></span>
                                        <svg
                                          class="animate-spin -ml-1 mr-3 h-5 w-5"
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
                                      ) : (
                                        <svg
                                          width="19"
                                          height="19"
                                          viewBox="0 0 19 19"
                                          fill="none"
                                          className="mr-2"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <mask
                                            id="path-1-inside-1_649_788"
                                            fill="white"
                                          >
                                            <path d="M16.231 2.80328C16.2251 2.79674 16.2235 2.78864 16.2173 2.78272C16.211 2.7768 16.2033 2.77462 16.1967 2.76902C14.478 1.0587 12.1105 0 9.5 0C4.26161 0 0 4.26161 0 9.5C0 12.1105 1.0587 14.478 2.76902 16.1967C2.77462 16.2033 2.77649 16.2114 2.78272 16.2173C2.78895 16.2232 2.79674 16.2254 2.80328 16.231C4.522 17.9413 6.88952 19 9.5 19C14.7381 19 19 14.7381 19 9.5C19 6.88952 17.9413 4.522 16.231 2.80328ZM9.5 0.934426C11.6937 0.934426 13.6968 1.7642 15.214 3.12566L3.12566 15.214C1.7642 13.6968 0.934426 11.6937 0.934426 9.5C0.934426 4.77679 4.77679 0.934426 9.5 0.934426ZM9.5 18.0656C7.30628 18.0656 5.30318 17.2358 3.78629 15.8747L15.8747 3.78629C17.2358 5.30318 18.0656 7.30628 18.0656 9.5C18.0656 14.2229 14.2229 18.0656 9.5 18.0656Z" />
                                          </mask>
                                          <path
                                            d="M16.231 2.80328C16.2251 2.79674 16.2235 2.78864 16.2173 2.78272C16.211 2.7768 16.2033 2.77462 16.1967 2.76902C14.478 1.0587 12.1105 0 9.5 0C4.26161 0 0 4.26161 0 9.5C0 12.1105 1.0587 14.478 2.76902 16.1967C2.77462 16.2033 2.77649 16.2114 2.78272 16.2173C2.78895 16.2232 2.79674 16.2254 2.80328 16.231C4.522 17.9413 6.88952 19 9.5 19C14.7381 19 19 14.7381 19 9.5C19 6.88952 17.9413 4.522 16.231 2.80328ZM9.5 0.934426C11.6937 0.934426 13.6968 1.7642 15.214 3.12566L3.12566 15.214C1.7642 13.6968 0.934426 11.6937 0.934426 9.5C0.934426 4.77679 4.77679 0.934426 9.5 0.934426ZM9.5 18.0656C7.30628 18.0656 5.30318 17.2358 3.78629 15.8747L15.8747 3.78629C17.2358 5.30318 18.0656 7.30628 18.0656 9.5C18.0656 14.2229 14.2229 18.0656 9.5 18.0656Z"
                                            fill="#333333"
                                            fill-opacity="0.4"
                                          />
                                          <path
                                            d="M16.231 2.80328L13.2648 5.48693L13.3286 5.5574L13.3956 5.62476L16.231 2.80328ZM16.1967 2.76902L13.3752 5.60437L13.4806 5.70927L13.5936 5.80604L16.1967 2.76902ZM2.76902 16.1967L5.80604 13.5936L5.70927 13.4806L5.60437 13.3752L2.76902 16.1967ZM2.80328 16.231L5.62476 13.3956L5.51935 13.2907L5.40644 13.194L2.80328 16.231ZM15.214 3.12566L18.0424 5.95408L21.028 2.9685L17.8855 0.148562L15.214 3.12566ZM3.12566 15.214L0.148562 17.8855L2.9685 21.028L5.95408 18.0424L3.12566 15.214ZM3.78629 15.8747L0.957868 13.0462L-2.02775 16.0318L1.11483 18.8518L3.78629 15.8747ZM15.8747 3.78629L18.8518 1.11483L16.0318 -2.02775L13.0462 0.957868L15.8747 3.78629ZM19.1971 0.119625C19.4137 0.358985 19.5594 0.578996 19.6464 0.722279C19.6891 0.792579 19.7208 0.849758 19.7374 0.880288C19.7495 0.902541 19.7661 0.933825 19.7548 0.912482C19.7508 0.905115 19.7291 0.864128 19.7001 0.813141C19.6698 0.759788 19.6235 0.681136 19.5627 0.588743C19.4384 0.39988 19.2477 0.144419 18.9723 -0.117277L13.4623 5.68272C13.1899 5.42398 13.0018 5.17175 12.8797 4.98628C12.8201 4.89558 12.7748 4.81866 12.7455 4.76706C12.7175 4.71783 12.6967 4.67863 12.6937 4.67305C12.6927 4.6711 12.6918 4.66934 12.6922 4.67014C12.6922 4.67025 12.6935 4.67264 12.695 4.67549C12.6981 4.68116 12.705 4.6942 12.714 4.71063C12.7316 4.74296 12.7643 4.80193 12.808 4.874C12.8972 5.02083 13.0453 5.2443 13.2648 5.48693L19.1971 0.119625ZM18.9723 -0.117277C18.7567 -0.322114 18.5557 -0.467439 18.4113 -0.562493C18.34 -0.609417 18.2797 -0.645859 18.2387 -0.669965C18.1996 -0.692989 18.1682 -0.710551 18.1626 -0.713663C18.1465 -0.722679 18.1704 -0.709358 18.1882 -0.699201C18.2121 -0.685557 18.2569 -0.659619 18.3124 -0.625177C18.4244 -0.555626 18.6014 -0.438117 18.7999 -0.26801L13.5936 5.80604C13.7953 5.97895 13.9758 6.09884 14.0912 6.17056C14.1484 6.20609 14.1951 6.23306 14.2207 6.24771C14.2338 6.25518 14.2442 6.26101 14.2489 6.26364C14.2513 6.26496 14.2532 6.26606 14.2534 6.26619C14.2542 6.26664 14.2529 6.26591 14.2516 6.26517C14.2478 6.26305 14.2182 6.24648 14.1808 6.22449C14.1416 6.20141 14.083 6.16604 14.0134 6.12024C13.8724 6.02743 13.6748 5.8846 13.4623 5.68272L18.9723 -0.117277ZM19.0182 -0.066339C16.5834 -2.48927 13.2142 -4 9.5 -4V4C11.0067 4 12.3726 4.60668 13.3752 5.60437L19.0182 -0.066339ZM9.5 -4C2.05247 -4 -4 2.05247 -4 9.5H4C4 6.47075 6.47075 4 9.5 4V-4ZM-4 9.5C-4 13.2142 -2.48927 16.5834 -0.066339 19.0182L5.60437 13.3752C4.60668 12.3726 4 11.0067 4 9.5H-4ZM-0.26801 18.7999C-0.459659 18.5763 -0.587624 18.3762 -0.659024 18.257C-0.694439 18.1979 -0.720648 18.1505 -0.732535 18.1289C-0.738583 18.1178 -0.743228 18.1092 -0.74384 18.1081C-0.74621 18.1037 -0.741958 18.1116 -0.738906 18.1172C-0.729122 18.1352 -0.653369 18.2768 -0.540672 18.4444C-0.418872 18.6256 -0.234705 18.868 0.0277234 19.1173L5.53772 13.3173C5.79703 13.5636 5.97863 13.8028 6.09815 13.9806C6.15691 14.068 6.20211 14.1427 6.23263 14.1951C6.26219 14.2458 6.28397 14.2858 6.29018 14.2973C6.29274 14.302 6.29651 14.309 6.29365 14.3037C6.29256 14.3016 6.28742 14.2921 6.28088 14.2802C6.26801 14.2568 6.24079 14.2076 6.20432 14.1467C6.1308 14.0239 6.00049 13.8204 5.80604 13.5936L-0.26801 18.7999ZM0.0277234 19.1173C0.243333 19.3221 0.44426 19.4674 0.588702 19.5625C0.660006 19.6094 0.720325 19.6459 0.761284 19.67C0.800403 19.693 0.831822 19.7105 0.837376 19.7137C0.853465 19.7227 0.829612 19.7094 0.811826 19.6992C0.787935 19.6856 0.743055 19.6596 0.687606 19.6252C0.57563 19.5556 0.398564 19.4381 0.200113 19.268L5.40644 13.194C5.20472 13.0211 5.02423 12.9012 4.90876 12.8294C4.85156 12.7939 4.80492 12.7669 4.77926 12.7523C4.76619 12.7448 4.7558 12.739 4.75112 12.7364C4.74876 12.735 4.7468 12.7339 4.74656 12.7338C4.74576 12.7334 4.74706 12.7341 4.74839 12.7348C4.75217 12.737 4.78183 12.7535 4.81919 12.7755C4.8584 12.7986 4.91699 12.834 4.98658 12.8798C5.12761 12.9726 5.32522 13.1154 5.53772 13.3173L0.0277234 19.1173ZM-0.0182033 19.0663C2.41665 21.4893 5.78579 23 9.5 23V15C7.99326 15 6.62735 14.3933 5.62476 13.3956L-0.0182033 19.0663ZM9.5 23C16.9472 23 23 16.9472 23 9.5H15C15 12.5289 12.5289 15 9.5 15V23ZM23 9.5C23 5.78579 21.4893 2.41665 19.0663 -0.0182033L13.3956 5.62476C14.3933 6.62735 15 7.99326 15 9.5H23ZM9.5 4.93443C10.6654 4.93443 11.7273 5.3712 12.5425 6.10275L17.8855 0.148562C15.6663 -1.84281 12.722 -3.06557 9.5 -3.06557V4.93443ZM12.3856 0.297228L0.297228 12.3856L5.95408 18.0424L18.0424 5.95408L12.3856 0.297228ZM6.10275 12.5425C5.3712 11.7273 4.93443 10.6654 4.93443 9.5H-3.06557C-3.06557 12.722 -1.84281 15.6663 0.148562 17.8855L6.10275 12.5425ZM4.93443 9.5C4.93443 6.98593 6.98593 4.93443 9.5 4.93443V-3.06557C2.56765 -3.06557 -3.06557 2.56765 -3.06557 9.5H4.93443ZM9.5 14.0656C8.33448 14.0656 7.27261 13.6287 6.45776 12.8975L1.11483 18.8518C3.33375 20.8429 6.27808 22.0656 9.5 22.0656V14.0656ZM6.61472 18.7031L18.7031 6.61472L13.0462 0.957868L0.957868 13.0462L6.61472 18.7031ZM12.8975 6.45776C13.6287 7.27261 14.0656 8.33448 14.0656 9.5H22.0656C22.0656 6.27808 20.8429 3.33375 18.8518 1.11483L12.8975 6.45776ZM14.0656 9.5C14.0656 12.0138 12.0138 14.0656 9.5 14.0656V22.0656C16.432 22.0656 22.0656 16.432 22.0656 9.5H14.0656Z"
                                            fill="#333333"
                                            fill-opacity="0.4"
                                            mask="url(#path-1-inside-1_649_788)"
                                          />
                                        </svg>
                                      )}
                                      <span className=" ml-2 mr-2 font-thin">
                                        Deactivate Agent
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
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

            {/* <FieldTable
              cols={tableConstants(handleEdit)}
              data={getAgents}
              isDark
            /> */}
          </div>
        </div>

        {/* Top 5 Performers agent */}
        <DashboardCard10 />
        {/* Top 5 Performers agent */}
        <DashboardCard100 />
        {/* <DashboardCard16 /> */}
      </div>
    </Layout>
  );
}

export default Staff;
