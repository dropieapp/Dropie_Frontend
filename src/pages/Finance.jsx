import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
// import images from "../assets/images/user-36-01.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import dateFormat from "dateformat";
import { Col, Modal, Row, Space, Tabs } from "antd";
import { clearMessage } from "../actions/message";
import InputField from "../components/InputField";
import { createPrice } from "../actions/pricing";

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

function Finance() {
  const dispatch = useDispatch();

  const history = useNavigate();
  const getInvoice = useSelector((state) => state.invoiceReducer.data);
  const getPrice = useSelector((state) => state.priceReducer.data);
  const { message } = useSelector((state) => state.message);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const fetchVehicle = JSON.parse(localStorage.getItem("vehicle_type"));
    if (fetchVehicle) {
      setVehicleTypes(fetchVehicle.data);
    }
  }, []);

  const [singleInvoice, setSingleInvoice] = useState();
  const [successful, setSuccessful] = useState(false);
  const [typeId, setTypeId] = useState();
  const [baseFare, setBaseFare] = useState();
  const [priceKm, setPriceKm] = useState();
  const [weight, setWeight] = useState();

  const handleTypeIdChange = (e) => {
    setTypeId(e.target.value);
  };
  const handleBaseFareChange = (e) => {
    setBaseFare(e.target.value);
  };
  const handlePriceKmChange = (e) => {
    setPriceKm(e.target.value);
  };
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const [info, setInfo] = useState();
  const [isSubmited, setIsSubmited] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const data = {
      type_id: typeId,
      base_fare: baseFare,
      price_km: priceKm,
      weight: weight,
    };
    dispatch(clearMessage());
    setInfo(data);
    setLoading(true);
  };

  useEffect(() => {
    if (isSubmited) {
      dispatch(createPrice(info))
        .then((res) => {
          setLoading(false);
          setIsSubmited(false);
          setSuccessful(true);
          setBaseFare("");
          setPriceKm("");
          setWeight("");
          setTypeId("");
          toast("Price added successfully", {
            type: "success",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        })
        .catch(() => {
          setLoading(false);
          setIsSubmited(false);
          toast("Something went wrong", {
            type: "error",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          setSuccessful(false);
        });
    }
  }, [isSubmited]);

  const handleInfo = (item) => {
    // alert(JSON.stringify(item));
    setSingleInvoice(JSON.stringify(item));
    setSuccessful(true);
  };

  useEffect(() => {
    if (successful && singleInvoice) {
      history("/finance/invoice", {
        state: singleInvoice,
      });
    }
  }, [successful, singleInvoice]);

  return (
    <Layout>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Avatars */}
        <DashboardTitle title="Accounting Dashboard" />

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Add view button */}
          <button
            className="btn hover:text-yellow-500 text-gray border"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden xs:block ml-2 mr-2">This Month</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="hover:text-yellow-500 btn text-gray h-8 px-4 text-sm"
            onClick={() => {
              dispatch(clearMessage());
              setSuccessful(false);
              setShowModal(true);
            }}
          >
            <svg
              width="60"
              height="49"
              viewBox="0 0 60 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_2027_1940)">
                <rect
                  x="5"
                  y="4"
                  width="50"
                  height="39"
                  rx="8.12095"
                  fill="#F97B04"
                />
                <rect
                  x="5.2"
                  y="4.2"
                  width="49.6"
                  height="38.6"
                  rx="7.92095"
                  stroke="#C51104"
                  stroke-opacity="0.1"
                  stroke-width="0.4"
                />
              </g>
              <path
                d="M39.7337 24.1325L31.8587 16.2575C31.5437 15.9425 31.1062 15.75 30.625 15.75H24.5C23.5375 15.75 22.75 16.5375 22.75 17.5V23.625C22.75 24.1062 22.9425 24.5437 23.2662 24.8675L31.1413 32.7425C31.4563 33.0575 31.8938 33.25 32.375 33.25C32.8562 33.25 33.2937 33.0575 33.6087 32.7337L39.7337 26.6087C40.0575 26.2937 40.25 25.8562 40.25 25.375C40.25 24.8938 40.0487 24.4475 39.7337 24.1325ZM25.8125 20.125C25.0863 20.125 24.5 19.5387 24.5 18.8125C24.5 18.0863 25.0863 17.5 25.8125 17.5C26.5387 17.5 27.125 18.0863 27.125 18.8125C27.125 19.5387 26.5387 20.125 25.8125 20.125Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_2027_1940"
                  x="0"
                  y="0"
                  width="60"
                  height="49"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.552941 0 0 0 0 0.231373 0 0 0 0 0.129412 0 0 0 0.02 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2027_1940"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2027_1940"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
          <Link
            to="/finance/create-invoice"
            // className="btn hover:text-yellow-500 text-gray border"
          >
            <button
              className="btn hover:text-yellow-500 text-gray border bg-orange-500"
              style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8851 6.90746H14.5826V1.53496C14.5826 1.39242 14.5429 1.2527 14.468 1.13146C14.393 1.01021 14.2858 0.912227 14.1583 0.848484C14.0308 0.78474 13.8881 0.757757 13.7462 0.770558C13.6042 0.783358 13.4686 0.835436 13.3546 0.920956L11.7659 2.11058C9.37125 0.322306 10.0543 0.322306 7.67508 2.11058C5.28815 0.322306 5.96355 0.322306 3.57663 2.11058L1.99558 0.920956C1.88155 0.835436 1.74596 0.783358 1.604 0.770558C1.46205 0.757757 1.31933 0.78474 1.19184 0.848484C1.06436 0.912227 0.957138 1.01021 0.882204 1.13146C0.807269 1.2527 0.767578 1.39242 0.767578 1.53496V15.35C0.767578 15.9606 1.01016 16.5463 1.44196 16.9781C1.87377 17.4099 2.45942 17.6525 3.07008 17.6525H15.3501C15.9607 17.6525 16.5464 17.4099 16.9782 16.9781C17.41 16.5463 17.6526 15.9606 17.6526 15.35V7.67496C17.6526 7.4714 17.5717 7.27619 17.4278 7.13225C17.2838 6.98832 17.0886 6.90746 16.8851 6.90746ZM3.07008 16.1175C2.86652 16.1175 2.67131 16.0366 2.52737 15.8927C2.38344 15.7487 2.30258 15.5535 2.30258 15.35V3.06996C3.83758 4.19818 3.38475 4.17516 5.62585 2.49433C8.0051 4.28261 7.3297 4.28261 9.71663 2.49433C12.0191 4.21353 11.574 4.17516 13.0476 3.06996C13.0476 15.9256 12.9862 15.5802 13.1781 16.1175H3.07008ZM16.1176 15.35C16.1176 15.5535 16.0367 15.7487 15.8928 15.8927C15.7488 16.0366 15.5536 16.1175 15.3501 16.1175C15.1465 16.1175 14.9513 16.0366 14.8074 15.8927C14.6634 15.7487 14.5826 15.5535 14.5826 15.35V8.44246H16.1176V15.35Z"
                  fill="white"
                />
                <path
                  d="M4.60539 7.67501H6.90789C7.11144 7.67501 7.30666 7.59415 7.4506 7.45022C7.59453 7.30628 7.67539 7.11107 7.67539 6.90751C7.67539 6.70396 7.59453 6.50874 7.4506 6.36481C7.30666 6.22088 7.11144 6.14001 6.90789 6.14001H4.60539C4.40184 6.14001 4.20662 6.22088 4.06269 6.36481C3.91875 6.50874 3.83789 6.70396 3.83789 6.90751C3.83789 7.11107 3.91875 7.30628 4.06269 7.45022C4.20662 7.59415 4.40184 7.67501 4.60539 7.67501Z"
                  fill="white"
                />
                <path
                  d="M10.7454 9.20996H4.60539C4.40184 9.20996 4.20662 9.29082 4.06269 9.43476C3.91875 9.57869 3.83789 9.77391 3.83789 9.97746C3.83789 10.181 3.91875 10.3762 4.06269 10.5202C4.20662 10.6641 4.40184 10.745 4.60539 10.745H10.7454C10.9489 10.745 11.1442 10.6641 11.2881 10.5202C11.432 10.3762 11.5129 10.181 11.5129 9.97746C11.5129 9.77391 11.432 9.57869 11.2881 9.43476C11.1442 9.29082 10.9489 9.20996 10.7454 9.20996Z"
                  fill="white"
                />
                <path
                  d="M10.7454 12.2799H4.60539C4.40184 12.2799 4.20662 12.3608 4.06269 12.5047C3.91875 12.6486 3.83789 12.8439 3.83789 13.0474C3.83789 13.251 3.91875 13.4462 4.06269 13.5901C4.20662 13.734 4.40184 13.8149 4.60539 13.8149H10.7454C10.9489 13.8149 11.1442 13.734 11.2881 13.5901C11.432 13.4462 11.5129 13.251 11.5129 13.0474C11.5129 12.8439 11.432 12.6486 11.2881 12.5047C11.1442 12.3608 10.9489 12.2799 10.7454 12.2799Z"
                  fill="white"
                />
              </svg>
            </button>
          </Link>
          {showModal ? (
            <>
              <Modal
                title="Set Price"
                centered
                visible={showModal}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                width={1000}
              >
                <div class="px-8 bg-white rounded-lg">
                  <div>
                    <form
                      name="form-signup"
                      id="form-signup"
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
                        </div>
                      )}
                      {!successful && (
                        <div>
                          <div class="py-4 px-8 mx-auto bg-white rounded-lg my-10">
                            <Space
                              direction="horizontal"
                              style={{
                                width: "100%",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Row
                                type="flex"
                                align="middle"
                                className="mt-5"
                                gutter={20}
                              >
                                <Col span={32}>
                                  <label
                                    className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
                                    htmlFor={name}
                                  >
                                    Vehicle type
                                  </label>
                                  <select
                                    id="type_id"
                                    value={typeId}
                                    onChange={handleTypeIdChange}
                                    name="type_id"
                                    className="w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                                  >
                                    <option value="">
                                      Select a Vehicle Type
                                    </option>

                                    {vehicleTypes.map((vehicle) => (
                                      <option
                                        key={vehicle.key}
                                        value={vehicle.id}
                                      >
                                        {vehicle.type}
                                      </option>
                                    ))}
                                  </select>
                                </Col>
                              </Row>
                              <Row
                                type="flex"
                                align="middle"
                                className="mt-5"
                                gutter={20}
                              >
                                <Col span={30}>
                                  <InputField
                                    label="Base Fare"
                                    name="base_fare"
                                    value={baseFare}
                                    onChange={handleBaseFareChange}
                                    type="number"
                                    placeholder="Base Fare"
                                  />
                                </Col>
                              </Row>

                              <Row
                                type="flex"
                                align="middle"
                                className="mt-5"
                                gutter={20}
                              >
                                <Col span={30} className="gutter-row">
                                  <InputField
                                    label="Price Per Km"
                                    name="price_km"
                                    value={priceKm}
                                    onChange={handlePriceKmChange}
                                    type="number"
                                    placeholder="Price Per Km"
                                  />
                                </Col>
                              </Row>
                              <Row
                                type="flex"
                                align="middle"
                                className="mt-5"
                                gutter={20}
                              >
                                <Col span={30} className="gutter-row">
                                  <InputField
                                    label="Weight"
                                    name="weight"
                                    value={weight}
                                    onChange={handleWeightChange}
                                    type="text"
                                    placeholder="10kg"
                                  />
                                </Col>
                              </Row>
                              <button
                                className={`relative w-52  flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
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
                                Set Prices
                              </button>
                            </Space>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </Modal>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
      <DashboardCard08 title="Revenue Analytics" />

      <div
        class="py-4 px-8 bg-white shadow-sm rounded-lg my-10 border"
        style={{
          borderColor: "rgba(197, 17, 4, 0.1)",
        }}
      >
        <Tabs defaultActiveKey="1" onChange={callback} className="custom-tab">
          <TabPane tab="All Invoices" key="1">
            <div x-data="handleSelect">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="vj font-semibold uppercase text-gray-500 border-t-2 border-b-2 border-gray-200">
                    <tr>
                      <th className="yl yd px-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Invoice ID
                        </div>
                      </th>
                      <th className="yl  yd px-2 py-3 whitespace-nowrap">
                        <div className="font-semibold">Date</div>
                      </th>
                      <th className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Payment Method
                        </div>
                      </th>
                      <th className="yl yd px-2 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Status</div>
                      </th>
                      <th className="yl yd px-2 py-3 whitespace-nowrap">
                        <span className="ng">Print</span>
                      </th>
                      <th className="yl yd px-2 py-3 whitespace-nowrap">
                        <span className="ng">Menu</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-md t_ lh">
                    {getInvoice && getInvoice.length > 0 ? (
                      getInvoice.map((invoice, index) => (
                        <tr key={index}>
                          <td className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="text-center">
                              {invoice.invoice_number}
                            </div>
                          </td>
                          <td className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="text-center">
                              {/* {dateFormat(invoice.date, "dddd, mmmm dS, yyyy")} */}
                              {invoice.date}
                            </div>
                          </td>
                          <td className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-800">
                              {capitalizeName(invoice.payment_method)}
                            </div>
                          </td>
                          <td className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="text-left status-cancelled">
                              Cancelled
                            </div>
                          </td>

                          <td className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="text-left">
                              <button className="btn shadow-lg font-medium">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  className="svg-inv-btn"
                                  // fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.4248 5.90625H4.31543C4.14449 5.90625 3.98055 5.83834 3.85968 5.71747C3.7388 5.5966 3.6709 5.43266 3.6709 5.26172V0.707031C3.6709 0.536091 3.7388 0.372152 3.85968 0.251279C3.98055 0.130406 4.14449 0.0625 4.31543 0.0625H13.4248C13.5957 0.0625 13.7597 0.130406 13.8806 0.251279C14.0014 0.372152 14.0693 0.536091 14.0693 0.707031V5.26172C14.0693 5.43266 14.0014 5.5966 13.8806 5.71747C13.7597 5.83834 13.5957 5.90625 13.4248 5.90625ZM4.95996 4.61719H12.7803V1.35156H4.95996V4.61719Z"
                                    fill="#C51104"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M13.4248 17.336H4.31543C4.14449 17.336 3.98055 17.2681 3.85968 17.1472C3.7388 17.0263 3.6709 16.8624 3.6709 16.6914V9.69141C3.6709 9.52047 3.7388 9.35653 3.85968 9.23565C3.98055 9.11478 4.14449 9.04688 4.31543 9.04688H13.4248C13.5957 9.04688 13.7597 9.11478 13.8806 9.23565C14.0014 9.35653 14.0693 9.52047 14.0693 9.69141V16.6914C14.0693 16.8624 14.0014 17.0263 13.8806 17.1472C13.7597 17.2681 13.5957 17.336 13.4248 17.336ZM4.95996 16.0469H12.7803V10.3359H4.95996V16.0469Z"
                                    fill="#C51104"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M15.4978 14.2852H13.4245C13.2536 14.2852 13.0897 14.2172 12.9688 14.0964C12.8479 13.9755 12.78 13.8116 12.78 13.6406C12.78 13.4697 12.8479 13.3057 12.9688 13.1849C13.0897 13.064 13.2536 12.9961 13.4245 12.9961H15.4978C15.7129 12.9959 15.9191 12.9103 16.0712 12.7582C16.2233 12.6061 16.3088 12.3999 16.309 12.1848V6.71793C16.3089 6.50277 16.2234 6.29645 16.0713 6.14426C15.9192 5.99208 15.7129 5.90648 15.4978 5.90625H2.24191C2.02675 5.90648 1.82048 5.99208 1.66837 6.14426C1.51627 6.29645 1.43078 6.50277 1.43066 6.71793V12.1848C1.43089 12.3999 1.51644 12.6061 1.66853 12.7582C1.82061 12.9103 2.02683 12.9959 2.24191 12.9961H4.31516C4.4861 12.9961 4.65004 13.064 4.77091 13.1849C4.89178 13.3057 4.95969 13.4697 4.95969 13.6406C4.95969 13.8116 4.89178 13.9755 4.77091 14.0964C4.65004 14.2172 4.4861 14.2852 4.31516 14.2852H2.24191C1.68509 14.2845 1.15126 14.063 0.757522 13.6692C0.363785 13.2755 0.142284 12.7417 0.141602 12.1848V6.71793C0.14217 6.16103 0.363621 5.62709 0.757371 5.23326C1.15112 4.83943 1.68501 4.61787 2.24191 4.61719H15.4978C16.0547 4.61787 16.5886 4.83943 16.9823 5.23326C17.3761 5.62709 17.5975 6.16103 17.5981 6.71793V12.1848C17.5974 12.7417 17.3759 13.2755 16.9822 13.6692C16.5884 14.063 16.0546 14.2845 15.4978 14.2852Z"
                                    fill="#C51104"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M3.62747 8.14078C3.60623 8.14085 3.58501 8.13984 3.56387 8.13777C3.54325 8.13562 3.5209 8.13218 3.50157 8.12832C3.48223 8.12445 3.4586 8.11886 3.44012 8.11285C3.42164 8.10683 3.40016 8.09953 3.38082 8.09136C3.36149 8.0832 3.34258 8.07417 3.32411 8.06429C3.30529 8.05464 3.28707 8.04388 3.26954 8.03207C3.25235 8.02046 3.23516 8.008 3.21883 7.99468C3.2025 7.98136 3.18661 7.96675 3.17157 7.95171C3.15653 7.93667 3.14235 7.92078 3.1286 7.90445C3.11528 7.8882 3.1028 7.87127 3.09121 7.85375C3.07947 7.83598 3.06873 7.81794 3.05899 7.7996C3.04911 7.78113 3.04008 7.76179 3.03192 7.74246C3.02375 7.72312 3.01688 7.70292 3.01043 7.68316C3.00399 7.66339 2.99926 7.64019 2.99497 7.62171C2.99067 7.60324 2.98766 7.57875 2.98551 7.55941C2.98139 7.51654 2.98139 7.47337 2.98551 7.4305C2.98766 7.40988 2.9911 7.38753 2.99497 7.3682C2.99883 7.34886 3.00442 7.32523 3.01043 7.30675C3.01645 7.28828 3.02375 7.26679 3.03192 7.24746C3.04008 7.22812 3.04911 7.20878 3.05899 7.19031C3.06887 7.17183 3.07961 7.15378 3.09121 7.13617C3.1028 7.11864 3.11528 7.10172 3.1286 7.08546C3.14192 7.06914 3.15653 7.05324 3.17157 7.0382C3.18661 7.02316 3.2025 7.00898 3.21883 6.99523C3.23516 6.98148 3.25235 6.96945 3.26954 6.95785C3.28707 6.94604 3.30529 6.93527 3.32411 6.92562C3.34273 6.91588 3.36163 6.90686 3.38082 6.89855C3.40016 6.89039 3.42036 6.88351 3.44012 6.87707C3.45989 6.87062 3.48309 6.86589 3.50157 6.8616C3.52004 6.8573 3.54454 6.85429 3.56387 6.85214C3.60604 6.84828 3.64847 6.84828 3.69063 6.85214C3.71168 6.85429 3.7336 6.85773 3.75336 6.8616C3.77313 6.86546 3.79633 6.87105 3.81438 6.87707C3.83243 6.88308 3.85477 6.89039 3.87411 6.89855C3.89344 6.90671 3.91235 6.91574 3.93082 6.92562C3.94958 6.93537 3.9678 6.94613 3.9854 6.95785C4.00258 6.96945 4.01977 6.98191 4.0361 6.99523C4.05243 7.00855 4.06832 7.02316 4.08336 7.0382C4.0984 7.05324 4.11215 7.06914 4.12633 7.08546C4.14051 7.10179 4.15211 7.11898 4.16372 7.13617C4.17532 7.15335 4.18606 7.17183 4.19594 7.19031C4.20582 7.20878 4.21485 7.22812 4.22301 7.24746C4.23118 7.26679 4.23805 7.28699 4.2445 7.30675C4.25094 7.32652 4.25567 7.34972 4.25997 7.3682C4.26426 7.38667 4.26727 7.41117 4.26942 7.4305C4.27354 7.47337 4.27354 7.51654 4.26942 7.55941C4.26727 7.58003 4.26383 7.60238 4.25997 7.62171C4.2561 7.64105 4.25051 7.66468 4.2445 7.68316C4.23848 7.70164 4.23118 7.72312 4.22301 7.74246C4.21485 7.76179 4.20582 7.78113 4.19594 7.7996C4.18606 7.81808 4.17532 7.83613 4.16372 7.85375C4.15211 7.87136 4.13922 7.88812 4.12633 7.90445C4.11344 7.92078 4.0984 7.93667 4.08336 7.95171C4.06832 7.96675 4.05243 7.98093 4.0361 7.99468C4.01977 8.00843 4.00258 8.02046 3.9854 8.03207C3.9678 8.04378 3.94958 8.05454 3.93082 8.06429C3.9122 8.07403 3.8933 8.08306 3.87411 8.09136C3.85477 8.09953 3.83457 8.1064 3.81438 8.11285C3.79418 8.11929 3.77399 8.12402 3.75336 8.12832C3.73274 8.13261 3.7104 8.13562 3.69063 8.13777C3.66964 8.13984 3.64856 8.14085 3.62747 8.14078Z"
                                    fill="#C51104"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M5.51809 8.14085C5.49704 8.14085 5.47512 8.14085 5.4545 8.13785C5.43387 8.13484 5.41153 8.13226 5.39219 8.12839C5.37286 8.12453 5.34922 8.11894 5.33075 8.11293C5.31227 8.10691 5.29079 8.09961 5.27145 8.09144C5.25211 8.08328 5.23278 8.07425 5.2143 8.06437C5.19582 8.05449 5.17778 8.04375 5.16016 8.03214C5.14263 8.02056 5.12571 8.00808 5.10946 7.99476C5.09313 7.98144 5.07723 7.96683 5.06219 7.95179C5.04715 7.93675 5.03297 7.92085 5.01922 7.90453C5.00547 7.8882 4.99344 7.87101 4.98184 7.85382C4.97004 7.83619 4.95915 7.81798 4.94918 7.79925C4.93973 7.78078 4.93071 7.76187 4.92254 7.74253C4.91438 7.7232 4.9075 7.703 4.90106 7.68324C4.89461 7.66347 4.88989 7.64027 4.88559 7.62179C4.88129 7.60332 4.87829 7.57882 4.87614 7.55949C4.87202 7.51662 4.87202 7.47345 4.87614 7.43058C4.87829 7.40996 4.88172 7.38761 4.88559 7.36828C4.88946 7.34894 4.89504 7.32531 4.90106 7.30683C4.90707 7.28836 4.91438 7.26687 4.92254 7.24754C4.93071 7.2282 4.93973 7.20929 4.94918 7.19082C4.95915 7.17209 4.97004 7.15388 4.98184 7.13625C4.99344 7.11906 5.0059 7.10187 5.01922 7.08554C5.03254 7.06921 5.04715 7.05332 5.06219 7.03828C5.07723 7.02324 5.09313 7.00906 5.10946 6.99531C5.12571 6.98199 5.14263 6.96951 5.16016 6.95793C5.17792 6.94618 5.19597 6.93544 5.2143 6.9257C5.23278 6.91582 5.25211 6.90679 5.27145 6.89863C5.29079 6.89046 5.31098 6.88359 5.33075 6.87714C5.35051 6.8707 5.37372 6.86597 5.39219 6.86168C5.41067 6.85738 5.43516 6.85437 5.4545 6.85222C5.49737 6.84825 5.54053 6.84825 5.5834 6.85222C5.60403 6.85437 5.62637 6.85781 5.64571 6.86168C5.66504 6.86554 5.68868 6.87113 5.70715 6.87714C5.72563 6.88316 5.74711 6.89046 5.76645 6.89863C5.78579 6.90679 5.80469 6.91582 5.82317 6.9257C5.84165 6.93558 5.86012 6.94632 5.87774 6.95793C5.89536 6.96953 5.91211 6.98199 5.92844 6.99531C5.94477 7.00863 5.96067 7.02324 5.97571 7.03828C5.99075 7.05332 6.0045 7.06921 6.01868 7.08554C6.03286 7.10187 6.04446 7.11906 6.05606 7.13625C6.06771 7.15388 6.07847 7.17209 6.08829 7.19082C6.09803 7.20944 6.10705 7.22834 6.11536 7.24754C6.12352 7.26687 6.13039 7.28707 6.13684 7.30683C6.14329 7.3266 6.14801 7.3498 6.15231 7.36828C6.15661 7.38675 6.15961 7.41125 6.16176 7.43058C6.16588 7.47345 6.16588 7.51662 6.16176 7.55949C6.15961 7.58011 6.15618 7.60246 6.15231 7.62179C6.14844 7.64113 6.14286 7.66476 6.13684 7.68324C6.13082 7.70171 6.12352 7.7232 6.11536 7.74253C6.10719 7.76187 6.09817 7.78078 6.08829 7.79925C6.07847 7.81797 6.06771 7.83619 6.05606 7.85382C6.04446 7.87101 6.03157 7.8882 6.01868 7.90453C6.00579 7.92085 5.99075 7.93675 5.97571 7.95179C5.96067 7.96683 5.94477 7.98101 5.92844 7.99476C5.91211 8.00851 5.89493 8.02054 5.87774 8.03214C5.86055 8.04375 5.84165 8.05449 5.82317 8.06437C5.80469 8.07425 5.78579 8.08328 5.76645 8.09144C5.74711 8.09961 5.72692 8.10648 5.70715 8.11293C5.68739 8.11937 5.66418 8.1241 5.64571 8.12839C5.62723 8.13269 5.60274 8.1357 5.5834 8.13785C5.56407 8.14 5.53914 8.14085 5.51809 8.14085Z"
                                    fill="#C51104"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M11.4053 12.7812H6.33496C6.16402 12.7812 6.00008 12.7133 5.87921 12.5925C5.75834 12.4716 5.69043 12.3077 5.69043 12.1367C5.69043 11.9658 5.75834 11.8018 5.87921 11.681C6.00008 11.5601 6.16402 11.4922 6.33496 11.4922H11.4053C11.5762 11.4922 11.7402 11.5601 11.861 11.681C11.9819 11.8018 12.0498 11.9658 12.0498 12.1367C12.0498 12.3077 11.9819 12.4716 11.861 12.5925C11.7402 12.7133 11.5762 12.7812 11.4053 12.7812Z"
                                    fill="#C51104"
                                    fill-opacity="0.6"
                                  />
                                  <path
                                    d="M11.4053 15.0586H6.33496C6.16402 15.0586 6.00008 14.9907 5.87921 14.8698C5.75834 14.7489 5.69043 14.585 5.69043 14.4141C5.69043 14.2431 5.75834 14.0792 5.87921 13.9583C6.00008 13.8374 6.16402 13.7695 6.33496 13.7695H11.4053C11.5762 13.7695 11.7402 13.8374 11.861 13.9583C11.9819 14.0792 12.0498 14.2431 12.0498 14.4141C12.0498 14.585 11.9819 14.7489 11.861 14.8698C11.7402 14.9907 11.5762 15.0586 11.4053 15.0586Z"
                                    fill="#C51104"
                                    fill-opacity="0.6"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>

                          <td className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              <button
                                onClick={() => handleInfo(invoice)}
                                className="btn inv-btn border text-orange-400 border-orange-100 p-4"
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No Invoice Data available</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Base Fare" key="2">
            <div x-data="handleSelect">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="vj font-semibold uppercase text-gray-500 border-t-2 border-b-2 border-gray-200">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">...</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Vehicle Type</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Base fare</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Price (km)</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Weight</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Phone Number</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-left">Date</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="text-center">...</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-md t_ lh">
                    {getPrice && getPrice.length > 0 ? (
                      getPrice.map((prices, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">...</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left capital">
                              {prices.type_id}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              ??? {prices.base_fare}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{prices.price_km}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {prices.weight_distance}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{prices.isDefault}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{prices.created_at}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            {/* <div className="text-left"> */}
                        
                            {/* </div> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No Price Info available</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
        </Tabs>
        {/* 
        <header className="px-6 py-5 flex justify-between">
          <h2 className="font-semibold text-gray-800 text-xl">All Invoice </h2>
          <button className="btn shadow-lg text-white">
            <svg
              className="w-5 h-5"
              width="21"
              height="19"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.875 4.03125H6.59375C6.38655 4.03125 6.18784 3.94894 6.04132 3.80243C5.89481 3.65591 5.8125 3.4572 5.8125 3.25C5.8125 3.0428 5.89481 2.84409 6.04132 2.69757C6.18784 2.55106 6.38655 2.46875 6.59375 2.46875H19.875C20.0822 2.46875 20.2809 2.55106 20.4274 2.69757C20.5739 2.84409 20.6562 3.0428 20.6562 3.25C20.6562 3.4572 20.5739 3.65591 20.4274 3.80243C20.2809 3.94894 20.0822 4.03125 19.875 4.03125Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M3.46875 4.03125H1.125C0.9178 4.03125 0.719086 3.94894 0.572573 3.80243C0.42606 3.65591 0.34375 3.4572 0.34375 3.25C0.34375 3.0428 0.42606 2.84409 0.572573 2.69757C0.719086 2.55106 0.9178 2.46875 1.125 2.46875H3.46875C3.67595 2.46875 3.87466 2.55106 4.02118 2.69757C4.16769 2.84409 4.25 3.0428 4.25 3.25C4.25 3.4572 4.16769 3.65591 4.02118 3.80243C3.87466 3.94894 3.67595 4.03125 3.46875 4.03125Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M14.4062 10.2812H1.125C0.9178 10.2812 0.719086 10.1989 0.572573 10.0524C0.42606 9.90592 0.34375 9.7072 0.34375 9.5C0.34375 9.2928 0.42606 9.09409 0.572573 8.94757C0.719086 8.80106 0.9178 8.71875 1.125 8.71875H14.4062C14.6135 8.71875 14.8122 8.80106 14.9587 8.94757C15.1052 9.09409 15.1875 9.2928 15.1875 9.5C15.1875 9.7072 15.1052 9.90592 14.9587 10.0524C14.8122 10.1989 14.6135 10.2812 14.4062 10.2812Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M6.59375 16.5312H1.125C0.9178 16.5312 0.719086 16.4489 0.572573 16.3024C0.42606 16.1559 0.34375 15.9572 0.34375 15.75C0.34375 15.5428 0.42606 15.3441 0.572573 15.1976C0.719086 15.0511 0.9178 14.9688 1.125 14.9688H6.59375C6.80095 14.9688 6.99966 15.0511 7.14618 15.1976C7.29269 15.3441 7.375 15.5428 7.375 15.75C7.375 15.9572 7.29269 16.1559 7.14618 16.3024C6.99966 16.4489 6.80095 16.5312 6.59375 16.5312Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M5.03125 5.59375C4.5677 5.59375 4.11456 5.45629 3.72913 5.19876C3.34371 4.94122 3.0433 4.57518 2.86591 4.14692C2.68852 3.71865 2.6421 3.2474 2.73254 2.79276C2.82297 2.33812 3.04619 1.9205 3.37397 1.59272C3.70175 1.26494 4.11937 1.04172 4.57401 0.951286C5.02865 0.860851 5.4999 0.907266 5.92817 1.08466C6.35643 1.26205 6.72247 1.56246 6.98001 1.94788C7.23754 2.33331 7.375 2.78645 7.375 3.25C7.375 3.8716 7.12807 4.46774 6.68853 4.90728C6.24899 5.34682 5.65285 5.59375 5.03125 5.59375ZM5.03125 2.46875C4.87673 2.46875 4.72569 2.51457 4.59721 2.60042C4.46874 2.68626 4.3686 2.80827 4.30947 2.95103C4.25034 3.09378 4.23487 3.25087 4.26501 3.40242C4.29516 3.55396 4.36956 3.69317 4.47882 3.80243C4.58808 3.91169 4.72729 3.98609 4.87884 4.01624C5.03038 4.04638 5.18747 4.03091 5.33022 3.97178C5.47298 3.91265 5.59499 3.81252 5.68084 3.68404C5.76668 3.55556 5.8125 3.40452 5.8125 3.25C5.8125 3.0428 5.73019 2.84409 5.58368 2.69757C5.43717 2.55106 5.23845 2.46875 5.03125 2.46875Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M15.9688 11.8438C15.5052 11.8438 15.0521 11.7063 14.6666 11.4488C14.2812 11.1912 13.9808 10.8252 13.8034 10.3969C13.626 9.96865 13.5796 9.4974 13.67 9.04276C13.7605 8.58812 13.9837 8.1705 14.3115 7.84272C14.6392 7.51494 15.0569 7.29172 15.5115 7.20129C15.9662 7.11085 16.4374 7.15727 16.8657 7.33466C17.2939 7.51205 17.66 7.81246 17.9175 8.19788C18.175 8.58331 18.3125 9.03645 18.3125 9.5C18.3125 10.1216 18.0656 10.7177 17.626 11.1573C17.1865 11.5968 16.5904 11.8438 15.9688 11.8438ZM15.9688 8.71875C15.8142 8.71875 15.6632 8.76457 15.5347 8.85042C15.4062 8.93626 15.3061 9.05828 15.247 9.20103C15.1878 9.34378 15.1724 9.50087 15.2025 9.65242C15.2327 9.80396 15.3071 9.94317 15.4163 10.0524C15.5256 10.1617 15.6648 10.2361 15.8163 10.2662C15.9679 10.2964 16.125 10.2809 16.2677 10.2218C16.4105 10.1627 16.5325 10.0625 16.6183 9.93404C16.7042 9.80557 16.75 9.65452 16.75 9.5C16.75 9.2928 16.6677 9.09409 16.5212 8.94757C16.3747 8.80106 16.176 8.71875 15.9688 8.71875Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M8.15625 18.0938C7.6927 18.0938 7.23956 17.9563 6.85413 17.6988C6.46871 17.4412 6.1683 17.0752 5.99091 16.6469C5.81352 16.2187 5.7671 15.7474 5.85754 15.2928C5.94797 14.8381 6.17119 14.4205 6.49897 14.0927C6.82675 13.7649 7.24437 13.5417 7.69901 13.4513C8.15365 13.3609 8.6249 13.4073 9.05317 13.5847C9.48143 13.7621 9.84747 14.0625 10.105 14.4479C10.3625 14.8333 10.5 15.2865 10.5 15.75C10.5 16.3716 10.2531 16.9677 9.81353 17.4073C9.37399 17.8468 8.77785 18.0938 8.15625 18.0938ZM8.15625 14.9688C8.00173 14.9688 7.85069 15.0146 7.72221 15.1004C7.59374 15.1863 7.4936 15.3083 7.43447 15.451C7.37534 15.5938 7.35987 15.7509 7.39001 15.9024C7.42016 16.054 7.49456 16.1932 7.60382 16.3024C7.71308 16.4117 7.85229 16.4861 8.00384 16.5162C8.15538 16.5464 8.31247 16.5309 8.45522 16.4718C8.59798 16.4127 8.71999 16.3125 8.80584 16.184C8.89168 16.0556 8.9375 15.9045 8.9375 15.75C8.9375 15.5428 8.85519 15.3441 8.70868 15.1976C8.56217 15.0511 8.36345 14.9688 8.15625 14.9688Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M19.875 10.2812H17.5312C17.324 10.2812 17.1253 10.1989 16.9788 10.0524C16.8323 9.90592 16.75 9.7072 16.75 9.5C16.75 9.2928 16.8323 9.09409 16.9788 8.94757C17.1253 8.80106 17.324 8.71875 17.5312 8.71875H19.875C20.0822 8.71875 20.2809 8.80106 20.4274 8.94757C20.5739 9.09409 20.6562 9.2928 20.6562 9.5C20.6562 9.7072 20.5739 9.90592 20.4274 10.0524C20.2809 10.1989 20.0822 10.2812 19.875 10.2812Z"
                fill="#333333"
                fill-opacity="0.6"
              />
              <path
                d="M19.875 16.5312H9.71875C9.51155 16.5312 9.31284 16.4489 9.16632 16.3024C9.01981 16.1559 8.9375 15.9572 8.9375 15.75C8.9375 15.5428 9.01981 15.3441 9.16632 15.1976C9.31284 15.0511 9.51155 14.9688 9.71875 14.9688H19.875C20.0822 14.9688 20.2809 15.0511 20.4274 15.1976C20.5739 15.3441 20.6562 15.5428 20.6562 15.75C20.6562 15.9572 20.5739 16.1559 20.4274 16.3024C20.2809 16.4489 20.0822 16.5312 19.875 16.5312Z"
                fill="#333333"
                fill-opacity="0.6"
              />
            </svg>
          </button>
        </header> */}
      </div>
      {/* <div className="mt-8">
        <div className="flex flex-col wk justify-between items-center">
          <nav className="mb-4 wu wi" role="navigation" aria-label="Navigation">
            <ul className="flex justify-center">
              <li className="ml-3 first--ml-0">
                <a
                  className="btn bg-white border-gray-200 text-slate-300 cursor-not-allowed"
                  href="#0"
                  disabled="disabled"
                >
                  &lt;- Previous
                </a>
              </li>
              <li className="ml-3 first--ml-0">
                <a
                  className="btn bg-white border-gray-200 hover--border-gray-300 text-orange-500"
                  href="#0"
                >
                  Next -&gt;
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-sm text-gray-500 text-center xd">
            Showing <span className="font-medium text-slate-600">1</span> to{" "}
            <span className="font-medium text-slate-600">10</span> of{" "}
            <span className="font-medium text-slate-600">248</span> results
          </div>
        </div>
      </div> */}
    </Layout>
  );
}
function capitalizeName(name) {
  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
}

export default Finance;
