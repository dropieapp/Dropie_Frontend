import React, { useState, useCallback, useEffect } from "react";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import FormSelectField from "../components/FormSelectField";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import FormField from "../components/FormField";
import DashboardCard15 from "../partials/dashboard/DashboardCard15";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard100 from "../partials/dashboard/DashboardCard100";
import DashboardCard16 from "../partials/dashboard/DashboardCard16";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/InputField";
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
  // const handleChange = useCallback((info) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }

  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (imageUrl) => {});
  //   }
  // });
  // const { loading, imageUrl } = this.state;

  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState({
    first_name: "",
    last_name: "",
    other_name: "",
    lga: "",
    id_card: "",
    address: "",
    land_mark: "",
    utility_bill: "",
    nok_full_name: "",
    nok_relationship: "",
    nok_phone_number: "",
    nok_address: "",
    nok_email: "",
    phone_number: "",
    transaction_pin: "",
    defaukt_pick_location: "",
    email: "",
    price: "",
  });
  const {
    first_name,
    last_name,
    other_name,
    lga,
    id_card,
    address,
    land_mark,
    utility_bill,
    nok_full_name,
    nok_relationship,
    nok_phone_number,
    nok_address,
    nok_email,
    phone_number,
    transaction_pin,
    defaukt_pick_location,
    email,
  } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
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
                            value={lga}
                            name="lga"
                            label="Local Goverment"
                            placeholder="Ikeja"
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      {/* <Row className="mt-5" gutter={16}>
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
                      </Row> */}
                      <Row className="mt-5" gutter={16}>
                        <Col span={12}>
                          <InputField
                            type="flie"
                            value={id_card}
                            name="id_card"
                            label="I.D Card"
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
                            value={other_name}
                            name="other_name"
                            label="Other Name"
                            placeholder="Makanbi"
                            onChange={handleChange}
                          />
                          <FormField
                            type="text"
                            label="Land Mark"
                            id="text"
                            placeholder="NCDC"
                          />
                        </Col>
                        <Col span={12}>
                          <div class="text-gray-700">
                            <label className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2 ">
                              Utility Bill
                            </label>
                            <input
                              type="file"
                              id="utility_bill"
                              name="utility_bill"
                              className="appearance-none block w-full px-8 py-2 border border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-5" gutter={16}>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Nok Full Name"
                            id="text"
                            placeholder="Mallam Sari"
                          />
                        </Col>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Nok Realationship"
                            id="text"
                            placeholder="Uncle"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-5" gutter={16}>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Nok Phone Number"
                            id="text"
                            placeholder="08234567222"
                          />
                        </Col>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Nok Address"
                            id="text"
                            placeholder="Lagos Street, Abuja"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-5" gutter={16}>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Nok Email"
                            id="text"
                            placeholder="test@gmail.com"
                          />
                        </Col>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Phone Number"
                            id="text"
                            placeholder="08112345678"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-5" gutter={16}>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Transaction Pin"
                            id="text"
                            placeholder="3832"
                          />
                        </Col>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Default Pickup Location"
                            id="text"
                            placeholder="Nasarawa"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-5" gutter={16}>
                        <Col span={12} className="gutter-row">
                          <FormField
                            type="text"
                            label="Email"
                            id="text"
                            placeholder="josh@email.com"
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
      </div>
    </Layout>
  );
}

export default Staff;
