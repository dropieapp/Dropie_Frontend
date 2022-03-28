import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardTitle from "../components/DashboardTitle";
import CheckboxTable from "../components/CheckboxTable";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../components/InputField";
import { retrieveAgents } from "../actions/staffs";
import { vehicleType, retrieveFleets, createFleets } from "../actions/fleets";
import { clearMessage } from "../actions/message";

function FleetManagement() {
  const dispatch = useDispatch();
    const form = useRef();
    const checkBtn = useRef();

  const [fleets, setFleets] = useState();
  const [getAgents, setGetAgents] = useState();
  const [vehiclesType, setVehiclesType] = useState([]);

  useEffect(() => {
    dispatch(vehicleType());
    dispatch(retrieveFleets());
    let vehicle_type = JSON.parse(localStorage.getItem("vehicle_type"));
    let get_fleets = JSON.parse(localStorage.getItem("get_fleets"));
    if (!vehicle_type) {
      return;
    } else {
      setVehiclesType(vehicle_type);
    }
    if (!get_fleets) {
      return;
    } else {
      setFleets(get_fleets);
    }
  }, []);

  useEffect(() => {
    dispatch(retrieveAgents());
    let fetchAgents = JSON.parse(localStorage.getItem("get_agents"));

    if (!fetchAgents) {
      return;
    } else {
      setGetAgents(fetchAgents);
    }
  }, []);

  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { message } = useSelector((state) => state.message);

  const [selectedFile1, setSelectedFile1] = useState(null);
  const uploadBanner = (e) => {
    setSelectedFile1(e.target.files[0]);
  };

  const [fleetInputValue, setFleetInputValue] = useState({
    type_id: "",
    name: "",
    location: "",
    agent_id: "",
    route: "",
    description: "",
  });
  const { type_id, name, location, agent_id, route, description } =
    fleetInputValue;

  const handleFleetChange = (e) => {
    const { name, value } = e.target;
    setFleetInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [successful, setSuccessful] = useState(false);
  const [isFleetSubmitted, setIsFleetSubmitted] = useState(false); // state for form status
  const [allFleetInputs, setAllFeetInputs] = useState();

  const submitFleet = (e) => {
    e.preventDefault(); // stop form submission
    const formData = new FormData(e.target);
    Object.entries(fleetInputValue).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("banner", selectedFile1);
    setAllFeetInputs(formData);
    setLoading(true);
    dispatch(clearMessage()); // clear message when changing location
    setIsFleetSubmitted(true);
     if (isFleetSubmitted) {
       localStorage.removeItem("add_fleets");
       dispatch(createFleets(formData))
         .then(() => {
           setSuccessful(true);
           setLoading(false);
         })
         .catch(() => {
           setSuccessful(false);
           setLoading(false);
         });
       localStorage.removeItem("get_fleets");
       dispatch(retrieveFleets());
     } else {
       setLoading(false);
     }
  };
  // useEffect(() => {

  // }, [isFleetSubmitted]);

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
                          Add Fleet
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
                        <small>
                          Note first add vehicle type before you proceed here
                        </small>
                        <form onSubmit={submitFleet} ref={form}>
                          {/* alert */}
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
                          {/* alert */}
                          {!successful && (
                            <div>
                              <div class="text-gray-700">
                                <label className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2 ">
                                  Add Image
                                </label>
                                <input
                                  type="file"
                                  name="banner"
                                  onChange={uploadBanner}
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                              </div>
                              <Row className="mt-5" gutter={16}>
                                <Col span={12} className="gutter-row">
                                  <label
                                    className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                                    htmlFor={name}
                                  >
                                    Vehicle type
                                  </label>
                                  <select
                                    id="type_id"
                                    value={type_id}
                                    onChange={handleFleetChange}
                                    name="type_id"
                                    className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                                  >
                                    <option value="">
                                      Select a Vehicle Type
                                    </option>

                                    {vehiclesType.data.map((vehicle, key) => (
                                      <option key={key} value={vehicle.id}>
                                        {vehicle.type}
                                      </option>
                                    ))}
                                  </select>
                                </Col>
                                <Col span={12}>
                                  <InputField
                                    type="text"
                                    value={name}
                                    name="name"
                                    label="Vehicle Name"
                                    placeholder="BMW 12 Model"
                                    onChange={handleFleetChange}
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-5" gutter={16}>
                                <Col span={12} className="gutter-row">
                                  <InputField
                                    type="text"
                                    value={location}
                                    name="location"
                                    label="Vehicle Location"
                                    placeholder="Select Location"
                                    onChange={handleFleetChange}
                                  />
                                </Col>
                                <Col span={12}>
                                  <label
                                    className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                                    htmlFor={name}
                                  >
                                    Assigned Driver/ Rider
                                  </label>
                                  <select
                                    id="status"
                                    value={agent_id}
                                    onChange={handleFleetChange}
                                    name="agent_id"
                                    className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                                  >
                                    <option value="">Select an Agent</option>
                                    {getAgents.data.map((agent) => (
                                      <option key={agent.key} value={agent.id}>
                                        {agent.first_name} {agent.last_name}
                                      </option>
                                    ))}
                                  </select>
                                </Col>
                              </Row>
                              <Row className="mt-5" gutter={16}>
                                <Col span={12} className="gutter-row">
                                  <InputField
                                    type="text"
                                    value={route}
                                    name="route"
                                    label="Assigned Route"
                                    placeholder="Select Route"
                                    onChange={handleFleetChange}
                                  />
                                </Col>
                                <Col span={12}>
                                  <InputField
                                    type="text"
                                    value={description}
                                    name="description"
                                    label="Vehicle Description"
                                    placeholder="Vehicle Description"
                                    onChange={handleFleetChange}
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
                                Add Vehicle Type
                              </button>
                            </div>
                          )}
                          <CheckButton
                            style={{ display: "none" }}
                            ref={checkBtn}
                          />
                        </form>
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
