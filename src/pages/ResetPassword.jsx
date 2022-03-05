import React from "react";
import Logo from "../assets/icons/dropexpress-logo.svg";
import FlatButton from "../components/FlatButton";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import "../css/custom.css";

function ResetPassword() {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;

    console.log(email, password);
  };

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="bg-white h-screen py-5 px-5">
      <img class="mx-auto h-12 w-auto my-10" src={Logo} alt="Workflow" />

      <div className="flex bg-white">
        <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Reset password
          </h2>
          <p class="mt-2 text-center text-sm">
            <span href="#" class="font-medium text-gray">
              If you forgot your password, well, then we’ll email you
              instructions to reset your password.
            </span>
          </p>

          <form>
            <FormField
              type="email"
              label="Email"
              id="email"
              placeholder="Enter your email address"
            />

            <div className="flex justify-center items-center mt-6">
              <button
                className="bg-red-700 text-white active:bg-red-600 relative w-full  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Reset Password
              </button>
            </div>
          </form>
          <p class="mt-5 text-center text-sm">
            <div class="flex justify-center max-w-sm m-auto">
              <div class="form-check inline-block">
                <Link to="/signin" className="text-sm primary-red-text">
                  {" "}
                  Return to login
                </Link>
              </div>
            </div>
          </p>

          {/* End */}

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      
                      <button
                        className="p-1 ml-auto red-700 border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div> */}
                    {/*body*/}
                    <div className="flex bg-white">
                      <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                          Verify your Identity
                        </h2>
                        <p class="mt-2 text-center text-sm">
                          <span href="#" class="font-medium text-gray">
                            We have sent a verrification code to
                            Dropie@gmail.com
                          </span>
                        </p>

                        <form onSubmit={handleFormSubmit} className="mt-6">
                          <FormField
                            type="text"
                            label=""
                            id="code"
                            placeholder="Enter Code"
                          />

                          <div className="flex justify-center items-center mt-2">
                            <Link to="/invite" className="relative w-full">
                              <FlatButton text="Verify" />
                            </Link>
                          </div>
                        </form>
                        <p class="mt-5 text-center text-sm">
                          <span href="#" class="font-medium text-gray">
                            Didn’t receive an email ?{" "}
                            <a
                              href="#"
                              class="font-medium text-red-600 hover:text-red-500"
                            >
                              Resend
                            </a>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {/* kn */}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
