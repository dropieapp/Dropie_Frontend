import React, { useEffect } from "react";
import Logo from "../assets/icons/dropexpress-logo.svg";
import FlatButton from "../components/FlatButton";
import FormField from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import "../css/custom.css";
import { forgotPassword, validateAccount } from "../actions/authentication";
import { clearMessage } from "../actions/message";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [successful, setSuccessful] = React.useState(false);
  const { message } = useSelector((state) => state.message);
  const [modalMessage, setModalMessage] = React.useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessful(false);
    dispatch(clearMessage());
  };

  useEffect(() => {
    if (successful) {
      dispatch(forgotPassword(email))
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          setShowModal(true);
          toast("Password reset link sent to your email", {
            type: "success",
            autoClose: 3000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch(() => {
          setLoading(false);
          setSuccessful(false); 
          toast(message, {
            type: "error",
            autoClose: 3000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  }, [successful]);

  const [showModal, setShowModal] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [modalSuccessful, setModalSuccessful] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const navigate = useNavigate();

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalSuccessful(true);
    dispatch(clearMessage());
  };

  useEffect(() => {
    if (modalSuccessful) {
      dispatch(validateAccount(email, code))
        .then(() => {
          setModalLoading(false);
          setShowModal(true);
          navigate("/change-password", {
            state: { email: email, code: code },
          });
        })
        .catch(() => {
          setModalLoading(false);
          toast("There is an error", {
            type: "error",
            autoClose: 3000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  }, [modalSuccessful]);

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

          <form className="space-y-6" onSubmit={handleResetPassword}>
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
            <InputField
              type="email"
              label="Email"
              name="email"
              value={email}
              placeholder="Enter your email address"
            />

            <div className="flex justify-center items-center mt-6">
              <button
                className="bg-red-700 text-white active:bg-red-600 relative w-full  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                {loading && (
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5"
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
                Reset Password
              </button>
            </div>
          </form>
          <p class="mt-5 text-center text-sm">
            <div class="flex justify-center max-w-sm m-auto">
              <div class="form-check inline-block">
                <Link to="/login" className="text-sm primary-red-text">
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
                            {email}
                          </span>
                        </p>

                        <form onSubmit={handleVerifyEmail} className="mt-6">
                          <InputField
                            type="text"
                            label="Code"
                            id="code"
                            placeholder="Enter Code"
                          />

                          <div className="flex justify-center items-center mt-2">
                            <button
                              className="bg-red-700 text-white active:bg-red-600 relative w-full  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                            >
                              {loading && (
                                <svg
                                  class="animate-spin -ml-1 mr-3 h-5 w-5"
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
                              Verify Code
                            </button>
                          </div>
                        </form>
                        <p class="mt-5 text-center text-sm">
                          <span href="#" class="font-medium text-gray">
                            Didn’t receive an email ?{" "}
                            <form onSubmit={handleResetPassword}>
                              <InputField
                                type="hidden"
                                label="Email"
                                name="email"
                                readonly="readonly"
                                value={email}
                                placeholder="Enter your email address"
                              />
                              <button
                                href="#"
                                class="font-medium text-red-600 hover:text-red-500"
                              >
                                Resend
                              </button>
                            </form>
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
