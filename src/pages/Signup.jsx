import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import { isEmail } from "validator";
import { register } from "../actions/authentication";
import CheckButton from "react-validation/build/button";
import Logo from "../assets/icons/dropexpress-logo.svg";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const Signup = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeConfirm_password = (e) => {
    const confirm_password = e.target.value;
    setConfirm_password(confirm_password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    setSubmitted(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(email, password, confirm_password))
        .then(() => {
          setSuccessful(true);
          setSubmitted(false);
        })
        .catch(() => {
          setSuccessful(false);
          setSubmitted(false);
        });
    }
  };

  return (
    <div className="bg-white h-screen py-5 px-5">
      <img className="mx-auto h-12 w-auto my-10" src={Logo} alt="Workflow" />
      <div className="flex bg-white">
        <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Register
          </h2>
          <p className="mt-2 text-center text-sm">
            <span href="#" className="font-medium text-gray">
              Create New Dropie Account
            </span>
          </p>
          <Form onSubmit={handleRegister} ref={form} className="space-y-6 mt-6">
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
                {successful ? (
                  <Link to="/login">
                    <button
                      className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                    >
                      Sign In
                    </button>
                  </Link>
                ) : null}
              </div>
            )}
            {!successful && (
              <div>
                <InputField
                  type="text"
                  value={email}
                  name="email"
                  label="Email Address"
                  placeholder="Enter Email Address"
                  onChange={onChangeEmail}
                />

                <InputField
                  type="password"
                  value={password}
                  name="password"
                  label="Password"
                  placeholder="Enter your Password"
                  onChange={onChangePassword}
                />

                <InputField
                  type="password"
                  value={confirm_password}
                  name="confirm_password"
                  label="Confirm password"
                  placeholder="Confirm Password"
                  onChange={onChangeConfirm_password}
                />
                <div className="form-group">
                  <button
                    className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                  >
                    {submitted && (
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
                    <span>Register</span>
                  </button>
                </div>
              </div>
            )}

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
          <p class="mt-5 text-center text-sm">
            <div class="flex justify-center max-w-sm m-auto">
              <div class="form-check inline-block">
                Already Have an Account?{" "}
                <Link to="/login" className="text-sm primary-red-text">
                  {" "}
                  Login
                </Link>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
