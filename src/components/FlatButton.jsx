import React, { useState } from "react";

const FlatButton = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
    >
      {props.text}
    </button>
  );
};
export default FlatButton;
