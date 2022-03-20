import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/icons/dropexpress-logo.svg";
// import toast from "react-hot-toast";

import { userActions } from "../_actions";

function SignIn() {
  const alert = useSelector((state) => state.alert);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (email && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(email, password, from));
    }
  }

  return (
    <div className="bg-white h-screen py-5 px-5  mb-6">
      <img class="mx-auto h-12 w-auto my-10" src={Logo} alt="Workflow" />

      <div className="flex bg-white">
        <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Login
          </h2>
          <p class="mt-2 text-center text-sm">
            <span href="#" class="font-medium text-gray">
              Access Dropie using your email and password.
            </span>
          </p>

          <form name="form" onSubmit={handleSubmit} className="space-y-6">
            {alert.message &&
              (alert.type === "alert-danger" ? (
                <div
                  className={`alert p-4 my-3 text-red-500 bg-red-200 ${alert.type}`}
                >
                  {alert.message}
                </div>
              ) : (
                <div
                  className={`alert p-4 my-3 text-green-500 bg-green-200 ${alert.type}`}
                >
                  {alert.message}
                </div>
              ))}

            <div className="form-group">
              <label
                for="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                className={
                  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
                  (submitted && !email ? "border-solid border-red-500" : "")
                }
              />
              {submitted && !email && (
                <div className="text-red-500">Email is required</div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className={
                  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
                  (submitted && !password ? "border-solid border-red-500" : "")
                }
              />
              {submitted && !password && (
                <div className="text-red-500">Password is required</div>
              )}
            </div>
            <div className="">
              <button
                className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
              >
                {loggingIn && (
                  // <span className="spinner-border spinner-border-sm mr-1"></span>
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <p class="mt-5 text-center text-sm">
        <div class="flex justify-center max-w-sm m-auto">
          <div class="form-check inline-block">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-sm primary-red-text">
              {" "}
              Create an account
            </Link>
          </div>
        </div>
      </p>
    </div>
  );
}

export default SignIn;
