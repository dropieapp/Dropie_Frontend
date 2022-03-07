import React, { useCallback, useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../partials/Header";
import { history } from "../_helpers";
import OtpInput from "react-otp-input";
import Success from "../assets/images/sucess.png";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazyload"; // use lazyload for components and image
import CompanyInfo from "./CompanyInfo";
import CompanyUpload from "./CompanyUpload";
import CompanyCompleted from "./ConfirmCompanyNo";
import { userActions } from "../_actions";

function UploadCompanyInfo() {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const alert = useSelector((state) => state.alert);

  const [value, setValue] = useState("");
  const handleChange = (value) => {
    setValue(value);
  };

  const [number, setNumber] = useState();
  const [formData, setFormData] = useState();

  const pageStage = useSelector((state) => state.company_reducer.FormStage);
  const stateAll = useSelector((state) => state);
  // console.log(stateAll.company_reducer.FormInfo);
  // console.log(`output: ${JSON.stringify(stateAll, null, 2)}`); // output results to console.log

  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);

  useEffect(() => {
    let onboard = JSON.parse(localStorage.getItem("onboard"));
    console.log(onboard);
    if (!localStorage.getItem("onboard")) {
      return;
    } else {
      if (onboard.next === "verify_phone") {
        setNumber(onboard.data);
        setShowModal(true);
      }
    }
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false); // state for form status
  const handleFormSubmit = (e) => {
    e.preventDefault(); // stop form submission
    setFormData({
      phone_number: number.business.phone_number,
      otp: value,
    });

    setIsSubmitted(true); // update form status to submitted
  };

  useEffect(() => {
    let verify_otp = JSON.parse(localStorage.getItem("verify_otp"));
    // if (isSubmitted) {
    //   console.log(formData);
    //   dispatch(userActions.verify_otp(formData));
    // } else if (!localStorage.getItem("verify_otp")) {
    //   return;
    // } else {
    //   if (verify_otp.next === "dashboard") {
    //     history.push("/login");
    //   }
    // }
    if (isSubmitted) {
      console.log(formData);
      dispatch(userActions.verify_otp(formData));
      window.location.reload();
    }
    if (!localStorage.getItem("verify_otp")) {
      return;
    } else {
      if (verify_otp.next === "dashboard") {
        history.push("/login");
      }
    }
  }, [isSubmitted, stateAll]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="bg-white h-screen py-5 px-5">
            <div className="flex bg-white">
              <div className="w-full max-w-xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-12">
                {alert.message && (
                  <div
                    className={`alert p-4 my-3 text-red-500 font-semibold bg-red-200 ${alert.type}`}
                  >
                    {alert.message}
                  </div>
                )}
                {pageStage === 1 && (
                  // Signup Page
                  <LazyLoad once>
                    <div className="wrap">
                      <CompanyInfo
                        pageTitle={"Company Info:"} // form page stage title
                        submitButtonText={"Save"} // submit next button display text
                        previousButton={false} // show/hide previous button
                      />
                    </div>
                  </LazyLoad>
                )}

                {pageStage === 2 && (
                  // Privacy Page
                  <LazyLoad once>
                    <div className="wrap">
                      <CompanyUpload
                        pageTitle={"Privacy Form:"} // form page stage title
                        submitButtonText={"Save"} // submit next button display text
                        previousButton={true} // show/hide previous button
                        // previousButton={true} // show/hide previous button
                        // successMessage={"Please verify your account!"} // page success message
                      />
                    </div>
                  </LazyLoad>
                )}
                {pageStage === 3 && (
                  // Completion Page
                  <LazyLoad once>
                    <div className="wrap">
                      <CompanyCompleted
                        pageTitle={"Success!"} // form page stage title
                        successMessage={
                          "Please verify your email address, you should have recieved an email from us already!"
                        } // page success message
                      />
                    </div>
                  </LazyLoad>
                )}
              </div>
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
                          <div className="w-full max-w-lg m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
                            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                              Confirm Company Number
                            </h2>
                            <p class="mt-2 text-center text-sm">
                              <span href="#" class="font-medium text-gray">
                                We have sent a verrification code to{" "}
                                {number.business.phone_number}
                              </span>
                            </p>

                            <form onSubmit={handleFormSubmit} className="mt-6">
                              <OtpInput
                                separator={
                                  <span>
                                    <strong>&nbsp;</strong>
                                  </span>
                                }
                                onChange={handleChange}
                                numInputs={6}
                                value={value}
                                inputStyle={{
                                  width: "50px",
                                  height: "3rem",
                                  margin: "20px 12px",
                                  fontSize: "2rem",
                                  borderRadius: 4,
                                  border: "1px solid rgba(0,0,0,0.3)",
                                }}
                              />
                              <button
                                className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                                type="submit"
                              >
                                Verify
                              </button>
                              <small>
                                Note: After verification please re-login again
                              </small>
                            </form>
                            <p class="mt-5 text-center text-sm">
                              <span href="#" class="font-medium text-gray">
                                Didn’t get a code? {""}
                                <a
                                  href="#"
                                  onClick={() => (
                                    setShowModal2(true), setShowModal(false)
                                  )}
                                  class="font-medium text-red-600 hover:text-red-500"
                                >
                                  More options
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

              {showModal2 ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}

                        {/*body*/}
                        <div className="flex bg-white">
                          <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
                            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                              Didn’t Get a Code
                            </h2>
                            <p class="mt-2 text-center text-sm">
                              <span href="#" class="text-xs  text-gray">
                                Resend to +234 9032411710
                              </span>
                            </p>

                            <ul class="">
                              <li
                                class="nav-item"
                                onClick={() => (
                                  setShowModal2(false), setShowModal3(true)
                                )}
                              >
                                <a
                                  class="px-3 py-2 flex items-center text-xs leading-snug hover:text-red-500"
                                  href="#pablo"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                  </svg>
                                  <span class="ml-2">Request call back</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="px-3 py-2 flex items-center text-xs leading-snug hover:text-red-500"
                                  href="#pablo"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <span class="ml-2">Request code by SMS</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="px-3 py-2 flex items-center text-xs leading-snug hover:text-red-500"
                                  href="#pablo"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                  </svg>
                                  <span class="ml-2">
                                    Request code by Email
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}

              {showModal3 ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}

                        {/*body*/}
                        <div className="flex bg-white">
                          <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-5 px-5">
                            <div class="group relative">
                              <div class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                <img
                                  src={Success}
                                  alt="Success"
                                  class="w-full h-full object-center object-cover"
                                />
                              </div>
                              <p class="text-base text-center font-semibold text-gray-900">
                                Sucess
                              </p>
                              <h3 class="mt-3 text-center text-sm text-gray-500">
                                <a href="#">
                                  <span class="absolute inset-0"></span>
                                  You’ve comfrimed your BVN
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UploadCompanyInfo;
