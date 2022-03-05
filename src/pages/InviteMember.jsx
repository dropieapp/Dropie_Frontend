import React from "react";
import Logo from "../assets/icons/dropexpress-logo.svg";
import FlatButton from "../components/FlatButton";
import FormField from "../components/FormField";
// import VerifyNumber from "./Verify_number";
import { Link } from "react-router-dom";

function InviteMember() {
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
            Invite new Managers
          </h2>
          <p class="mt-2 text-center text-sm">
            <span href="#" class="font-medium text-gray">
              If you forgot your password, well, then we’ll email you
              instructions to reset your password.
            </span>
          </p>

          <form onSubmit={handleFormSubmit} className="mt-2">
            <FormField
              type="text"
              label="Add new Manager Email"
              id="invite"
              placeholder=""
            />

            <div className="flex justify-center items-center mt-2">
              <Link to="/signin" className="relative w-full">
                <FlatButton text="Resgister" />
              </Link>
            </div>
          </form>
          <p class="mt-5 text-center text-sm primary-red-text">
            <div class="flex justify-center max-w-sm m-auto">
              <div class="form-check inline-block">Skip</div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InviteMember;
