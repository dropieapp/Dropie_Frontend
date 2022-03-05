import React from "react";
import { Link } from "react-router-dom";

function DashboardTitle(props) {
  return (
    <ul className="justify-center sm:justify-start">
      <span className="text-2xl primary-red-text primary-ui-text">
        {props.title}
      </span>
      <p className="text-xs text-gray-400">{props.subtitle}</p>
    </ul>
    
  );
}

export default DashboardTitle;
