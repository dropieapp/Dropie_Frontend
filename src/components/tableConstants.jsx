import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import FlatButton from "./FlatButton";

// This is the table constant/settings which needed to render table elements
export const tableConstants = (handleEdit) => {
  const [rating, setRating] = useState(0); // initial rating value
  const [showModal, setShowModal] = useState(true); // initial rating value

  return [
    {
      title: "Agent Name",
      render: (rowData) => {
        return (
          <div className="text-gray-800">
            {rowData.first_name} {rowData.last_name}
          </div>
        );
      },
    },
    {
      title: "Current Location",
      render: (rowData) => {
        return (
          <div className="text-gray-800">{rowData.default_pick_location}</div>
        );
      },
    },
    {
      title: "Assigned Vehicle",
      render: (rowData) => {
        return (
          <div>
            {rowData && rowData.fleet === null ? (
              <Link
                to={{
                  pathname: `fleet-management`,
                  state: { showModal },
                }}
              >
                {" "}
                <FlatButton text="Assign Fleet" />
              </Link>
            ) : (
              <div>{rowData.fleet.name}</div>
            )}
          </div>
        );
        // return <div className="text-gray-800">{rowData.fleet.id}</div>;
      },
    },
    {
      title: "Agent Rating",
      render: (rowData) => {
        return <div className="text-gray-800">{rowData.rating}</div>;
      },
    },
    {
      title: "Agent Phone Number",
      render: (rowData) => {
        return <div className="text-gray-800">{rowData.phone_number}</div>;
      },
    },
    {
      title: "Status",
      render: (rowData) => {
        return <div className="text-gray-800">{rowData.status}</div>;
      },
    },
    {
      title: "...",
      render: (rowData) => {
        return (
          <button className="btn btn-warning" onClick={handleEdit(rowData)}>
            ...
          </button>
        );
      },
    },
  ];
};
