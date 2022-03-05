import React from "react";
import Logo from "../assets/icons/dropexpress-logo.svg";
import FlatButton from "../components/FlatButton";
import FormField from "../components/FormField";
// import VerifyNumber from "./Verify_number";
import { Link } from "react-router-dom";
import "../css/custom.css";

function ChangePassword() {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;

    console.log(email, password);
  };

  return (
    <div className="bg-white h-screen py-5 px-5">
      <img class="mx-auto h-12 w-auto my-10" src={Logo} alt="Workflow" />

      <div className="flex bg-white">
        <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Change Password
          </h2>

          <form onSubmit={handleFormSubmit} className="mt-7">
            <FormField
              type="password"
              label="Password"
              id="password"
              placeholder="Enter your Password"
            />
            <FormField
              type="password"
              label="Comfirm Password"
              id="cpassword"
              placeholder="Comfirm Password"
            />
            <small className="gray-text">
              Make sure it's at least 15 characters OR at least 8 characters
              including a number and a lowercase letter.{" "}
              <span className="primary-red-text">Learn more</span>.
            </small>

            <div className="flex justify-center items-center mt-6">
              <Link to="/dashboard" className="relative w-full">
                <FlatButton text="Change Password" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
