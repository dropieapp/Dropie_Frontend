import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardTitle from "../components/DashboardTitle";
import CheckboxTable from "../components/CheckboxTable";
import FormField from "../components/FormField";
import ImageUpload from "../components/ImageUpload";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions/user.actions";

function FleetManagement() {
  // const users = useSelector((state) => state.users);
  // const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  const [fleets, setFleets] = useState();

  useEffect(() => {
    let fleet = localStorage.getItem("fleet");
    dispatch(userActions.getAllFleet());
    setFleets(fleet.data);
  }, []);

  console.log(fleets);
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Layout>
      <div className="sm:px-6 pl-8 py-8 w-full max-w-9xl mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <DashboardTitle
            title="Vechicle List"
            subtitle="You have total 2,595 Vechicle"
          />
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
                  <div className="relative w-auto my-6 mx-auto w-6/12">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-lg font-normal text-center text-black lg:text-2xl">
                          Add Vehicles
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-toggle="defaultModal"
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
                        <ImageUpload />
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <FormField
                              type="email"
                              label="Vehicle Type"
                              id="text"
                              placeholder="Motorcycle"
                            />
                          </Col>
                          <Col span={12}>
                            <FormField
                              type="email"
                              label="Vehicle Type"
                              id="text"
                              placeholder="Motorcycle"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <FormField
                              type="email"
                              label="Vehicle Type"
                              id="text"
                              placeholder="Motorcycle"
                            />
                          </Col>
                          <Col span={12}>
                            <FormField
                              type="email"
                              label="Vehicle Type"
                              id="text"
                              placeholder="Motorcycle"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-5" gutter={16}>
                          <Col span={12} className="gutter-row">
                            <FormField
                              type="email"
                              label="Vehicle Type"
                              id="text"
                              placeholder="Motorcycle"
                            />
                          </Col>
                          <Col span={12}>
                            <FormField
                              type="email"
                              label="Vehicle Type"
                              id="text"
                              placeholder="Motorcycle"
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
        <div
          class="py-4 px-8 bg-white shadow-sm rounded-lg my-10 border"
          style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
        >
          <CheckboxTable />
        </div>
      </div>
    </Layout>
  );
}

export default FleetManagement;
