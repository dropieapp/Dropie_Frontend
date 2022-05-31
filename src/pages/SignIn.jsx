import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { login } from "../actions/authentication";
import InputField from "../components/InputField";
import Logo from "../assets/icons/dropexpress-logo.svg";

const SignIn = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.authentication);
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
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/");
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
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
          <Form onSubmit={handleLogin} ref={form} className="space-y-6">
            {message && (
              <div className="form-group">
                <div
                  className="p-4 my-3 text-red-500 font-semibold bg-red-200"
                  role="alert"
                >
                  <ul className="mx-3 my-3">{message}</ul>
                </div>
              </div>
            )}
            <InputField
              type="email"
              className="form-control"
              name="username"
              value={email}
              onChange={onChangeEmail}
              label="Email Address"
              placeholder="Email Address"
            />
            <InputField
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              label="Password"
              placeholder="Password"
            />
            {/* <div className="flex justify-end"> */}
            {/* <p className="text-right py-0">
              <small>
                <Link
                  to="/forgot-password"
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Forgot Password?
                </Link>
              </small>
            </p> */}
            <div
              className="flex justify-end space-y-5"
              style={{
                marginTop: "-0.75em",

              }}
            >
              <Link
                to="/reset-password"
                className="text-red-600 hover:text-red-500"
              >
                Forgot Password?
              </Link>
            </div>

            {/* </div> */}

            <div className="form-group">
              <button
                disabled={loading}
                className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
              >
                {loading && (
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
                <span>Login</span>
              </button>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
          <p class="mt-5 text-center text-sm">
            <div class="flex justify-center max-w-sm m-auto">
              <div class="form-check inline-block">
                Don’t have an account yet?
                <Link to="/register" className="text-sm primary-red-text">
                  Create an account
                </Link>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
