import React, { useState, useCallback, useEffect } from "react";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import DashboardCard15 from "../partials/dashboard/DashboardCard15";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard100 from "../partials/dashboard/DashboardCard100";
import DashboardCard16 from "../partials/dashboard/DashboardCard16";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { userActions } from "../_actions";
import FieldTable from "../components/FieldTable";
import { tableConstants } from "../components/tableConstants";
// import {
//   userSelector,
//   fetchUserBytoken,
//   clearState,
// } from "../features/User/UserSlice";
// import { useHistory } from "react-router-dom";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
function Staff() {
  const register = useSelector((state) => state.registerAgent.registering);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

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

  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const uploadIdCard = (e) => {
    setSelectedFile1(e.target.files[0]);
  };
  const uploadProfilePic = (e) => {
    setSelectedFile2(e.target.files[0]);
  };
  const alert = useSelector((state) => state.alert);

  const [allInputs, setAllInputs] = useState();

  // onsubmit
  const [isSubmitted, setIsSubmitted] = useState(false); // state for form status
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    // setInfo(infos);
    let formData = new FormData(e.target);
    Object.entries(inputValue).forEach(([key, value]) => {
      formData.append(key, value);
    });
    setAllInputs(formData);
    setIsSubmitted(true); // update form status to submitted
    
  };
  useEffect(() => {
    if (
      isSubmitted &&
      email &&
      transaction_pin &&
      first_name &&
      last_name &&
      employment_date &&
      selectedFile1 &&
      selectedFile2
    ) {
      dispatch(userActions.add_agent(allInputs));
      dispatch(userActions.get_agents());
    }
  }, [])

  const [getAgents, setGetAgents] = useState([]);

  useEffect(() => {
    let get_agents = JSON.parse(localStorage.getItem("get_agents"));
    setGetAgents(get_agents.data);
  }, []);

  const handleEdit = (item) => () => {
    // write your logic
    alert(JSON.stringify(item));
  };

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
                <div className="relative h-full mx-auto w-auto w-96 md:w-96 lg:w-6/12">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                      <h3 class="text-lg font-normal text-center text-black lg:text-2xl">
                        Add Agent
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
                    <form onSubmit={handleSubmit}>
                      {/* {alert.message && (
                        <ul className="alert mx-5 p-4 my-3 text-red-500 font-semibold bg-red-200">
                          {message}
                        </ul>
                      )} */}
                      {alert && typeof alert.message === "string" ? (
                        <ul className="alert mx-5 p-4 my-3 text-red-500 font-semibold bg-red-200">
                          <li>{alert.message}</li>
                        </ul>
                      ) : typeof alert.message === "undefined" ? null : (
                        Object.keys(alert.message).map((key) => {
                          return (
                            <ul
                              className="alert mx-5 p-4 my-3 text-red-500 font-semibold bg-red-200"
                              key={key}
                            >
                              {alert.message[key].map((dataItem) => {
                                return <li>{dataItem}</li>;
                              })}
                            </ul>
                          );
                        })
                      )}

                      <div class="py-4 px-8 bg-white rounded-lg my-10">
                        <Row className="mt-5" gutter={16}>
                          <Col span={12}>
                            <InputField
                              type="text"
                              value={first_name}
                              placeholder="Makanbi"
                              label="First Name"
                              name="first_name"
                              error={isSubmitted}
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
                              error={isSubmitted}
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
                              error={isSubmitted}
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
                              error={isSubmitted}
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
                              error={isSubmitted}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="text"
                              value={address}
                              name="address"
                              onChange={handleChange}
                              error={isSubmitted}
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
                              error={isSubmitted}
                              placeholder="josh@email.com"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col span={12} className="gutter-row">
                            <InputField
                              type="date"
                              value={employment_date}
                              error={isSubmitted}
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
                                className={
                                  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
                                  (isSubmitted && !selectedFile1
                                    ? "border-solid border-red-500"
                                    : "")
                                }
                              />
                              {isSubmitted && !selectedFile1 && (
                                <div className="text-red-500">
                                  ID Card is required
                                </div>
                              )}
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
                                className={
                                  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
                                  (isSubmitted && !selectedFile2
                                    ? "border-solid border-red-500"
                                    : "")
                                }
                              />
                              {isSubmitted && !selectedFile2 && (
                                <div className="text-red-500">
                                  Profile Photo is required
                                </div>
                              )}
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
                              error={isSubmitted}
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
                              error={isSubmitted}
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
                              error={isSubmitted}
                            />
                          </Col>
                        </Row>
                        <button
                          className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                        >
                          {register && (
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
                    </form>

                    {/* /body */}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* <p>{email}</p> */}
        {/* Total Revenue */}
        <DashboardCard15 />
        {/* Total Revenue */}
        <DashboardCard15 />
        {/* Total Revenue */}
        <DashboardCard15 />

        {/* Top 5 Performers agent */}
        <DashboardCard10 />
        {/* Top 5 Performers agent */}
        <DashboardCard100 />
        <DashboardCard16 />

        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Agent List</h2>
          </header>
          <div className="p-3">
            <FieldTable
              cols={tableConstants(handleEdit)}
              data={getAgents}
              isDark
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Staff;
