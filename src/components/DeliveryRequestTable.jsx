import React, { useState } from "react";
import dateformat from "dateformat";
import { Col, Modal, Row } from "antd";

function DeliveryRequestTable({
  deliveries
}) {
 const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(null);
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
  return (
    <div
      className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border"
      style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
    >
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-xs text-gray-800">Recent Delivery Request</h2>
      </header>
      <div className="p-3">
        {/* Table */}
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
                  <div className="font-semibold text-left">Assigned Rider</div>
                </th>

                <th className="yl yd px-2 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Sender Phone Number
                  </div>
                </th>
                <th className="yl yd px-2 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Sender Address</div>
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
            {deliveries &&
            deliveries.current &&
            deliveries.current.length > 0 ? (
              deliveries.current.map((delivery, index) => (
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
                          {delivery.agent.first_name} {delivery.agent.last_name}
                        </div>
                      </div>
                    </td>
                    <td className="yl yd px-2 py-3 whitespace-nowrap">
                      <div className="text-left">
                        {delivery.delivery_contact_number}
                      </div>
                    </td>
                    <td className="yl yd px-2 py-3 whitespace-nowrap">
                      <div className="text-left">{delivery.pickup_address}</div>
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
                        {dateformat(delivery.created_at, "dddd, mmmm dS, yyyy")}
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
                <td colSpan="6" className="text-center text-lg font-bold py-4">
                  No Delivery
                </td>
              </tr>
            )}
          </table>
        </div>
        <Modal
          title="View Delivery"
          centered
          visible={showModal}
          onOk={() => setShowModal(false)}
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
      </div>
    </div>
  );
}

export default DeliveryRequestTable;