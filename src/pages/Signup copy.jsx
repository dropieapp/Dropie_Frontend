import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/icons/dropexpress-logo.svg";

import { userActions } from "../_actions";

function SignUp() {
  const alert = useSelector((state) => state.alert);

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (user.email && user.password && user.confirm_password) {
      dispatch(userActions.register(user));
    }
  }

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
          <form name="form" className="space-y-6 mt-6" onSubmit={handleSubmit}>
            {alert.message && (
              <div
                className={`alert p-4 my-3 text-red-500 font-semibold bg-red-200 ${alert.type}`}
              >
                {alert.message}
              </div>
            )}
            <div>
              <label
                for="email"
                className="block my-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className={
                  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
                  (submitted && !user.email
                    ? "border-solid border-red-500"
                    : "")
                }
              />
              {submitted && !user.email && (
                <div className="text-red-500">Email is required</div>
              )}
            </div>
            <div>
              <label
                for="password"
                className="block my-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className={
                  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
                  (submitted && !user.password
                    ? "border-solid border-red-500"
                    : "")
                }
              />
              {submitted && !user.password && (
                <div className="text-red-500">Password is required</div>
              )}
            </div>
            <div>
              <label
                for="cpassword"
                className="block my-2 text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                value={user.confirm_password}
                onChange={handleChange}
                className={
                  "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
                  (submitted && !user.confirm_password
                    ? "border-solid border-red-500"
                    : "")
                }
              />
              {submitted && !user.confirm_password && (
                <div className="text-red-500">Confirm Password is required</div>
              )}
            </div>
            <div className="form-group">
              <button
                className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
              >
                {registering && (
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className="mt-5 text-center text-sm">
        <div className="flex justify-center max-w-sm m-auto">
          <div className="form-check inline-block">
            <input
              className="form-check-input border border-gray-300 rounded-sm bg-white checked:bg-blue-600 mr-1 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain float-left cursor-pointer"
              type="checkbox"
              value=""
              id="flexCheckIndeterminate"
            />
            <label
              className="form-check-label text-gray-800 text-sm"
              for="flexCheckIndeterminate"
            >
              Creating and account means you are okay with Dropie’s{" "}
              <a className="text-red-600">terms</a> of services & our{" "}
              <a className="text-red-600">privacy policy</a>
            </label>
          </div>
        </div>
      </p>
    </div>
  );
}

export default SignUp;


