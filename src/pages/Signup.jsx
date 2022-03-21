// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Logo from "../assets/icons/dropexpress-logo.svg";

// import { userActions } from "../_actions";

// function SignUp() {
//   const alert = useSelector((state) => state.alert);

//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//     confirm_password: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const registering = useSelector((state) => state.registration.registering);
//   const dispatch = useDispatch();

//   // reset login status
//   useEffect(() => {
//     dispatch(userActions.logout());
//   }, []);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setUser((user) => ({ ...user, [name]: value }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     setSubmitted(true);
//     if (user.email && user.password && user.confirm_password) {
//       dispatch(userActions.register(user));
//     }
//   }

//   return (
//     <div className="bg-white h-screen py-5 px-5">
//       <img className="mx-auto h-12 w-auto my-10" src={Logo} alt="Workflow" />

//       <div className="flex bg-white">
//         <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
//           <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
//             Register
//           </h2>
//           <p className="mt-2 text-center text-sm">
//             <span href="#" className="font-medium text-gray">
//               Create New Dropie Account
//             </span>
//           </p>
//           <form name="form" className="space-y-6 mt-6" onSubmit={handleSubmit}>
//             {alert.message && (
//               <div
//                 className={`alert p-4 my-3 text-red-500 font-semibold bg-red-200 ${alert.type}`}
//               >
//                 {alert.message}
//               </div>
//             )}
//             <div>
//               <label
//                 for="email"
//                 className="block my-2 text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleChange}
//                 className={
//                   "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
//                   (submitted && !user.email
//                     ? "border-solid border-red-500"
//                     : "")
//                 }
//               />
//               {submitted && !user.email && (
//                 <div className="text-red-500">Email is required</div>
//               )}
//             </div>
//             <div>
//               <label
//                 for="password"
//                 className="block my-2 text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={user.password}
//                 onChange={handleChange}
//                 className={
//                   "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
//                   (submitted && !user.password
//                     ? "border-solid border-red-500"
//                     : "")
//                 }
//               />
//               {submitted && !user.password && (
//                 <div className="text-red-500">Password is required</div>
//               )}
//             </div>
//             <div>
//               <label
//                 for="cpassword"
//                 className="block my-2 text-sm font-medium text-gray-700"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 name="confirm_password"
//                 value={user.confirm_password}
//                 onChange={handleChange}
//                 className={
//                   "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
//                   (submitted && !user.confirm_password
//                     ? "border-solid border-red-500"
//                     : "")
//                 }
//               />
//               {submitted && !user.confirm_password && (
//                 <div className="text-red-500">Confirm Password is required</div>
//               )}
//             </div>
//             <div className="form-group">
//               <button
//                 className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
//               >
//                 {registering && (
//                   // <span className="spinner-border spinner-border-sm mr-1"></span>
//                   <svg
//                     class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       class="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       stroke-width="4"
//                     ></circle>
//                     <path
//                       class="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                 )}
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <p className="mt-5 text-center text-sm">
//         <div className="flex justify-center max-w-sm m-auto">
//           <div className="form-check inline-block">
//             <input
//               className="form-check-input border border-gray-300 rounded-sm bg-white checked:bg-blue-600 mr-1 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain float-left cursor-pointer"
//               type="checkbox"
//               value=""
//               id="flexCheckIndeterminate"
//             />
//             <label
//               className="form-check-label text-gray-800 text-sm"
//               for="flexCheckIndeterminate"
//             >
//               Creating and account means you are okay with Dropie’s{" "}
//               <a className="text-red-600">terms</a> of services & our{" "}
//               <a className="text-red-600">privacy policy</a>
//             </label>
//           </div>
//         </div>
//       </p>
//     </div>
//   );
// }

// export default SignUp;

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../actions/authentication";

import Logo from "../assets/icons/dropexpress-logo.svg";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 6) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const cpassword = (value) => {
  if (value.length < 6 || value.length > 6) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const Signup = () => {
  const form = useRef();
  const checkBtn = useRef();
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [successful, setSuccessful] = useState(false);
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
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(email, password, confirm_password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
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
            {!successful && (
              <div>
                <div className="form-group">
                  {/* <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  /> */}
                  <InputField
                    type="text"
                    value={email}
                    name="email"
                    label="Email"
                    placeholder="Enter Email Address"
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  /> */}
                  <InputField
                    type="password"
                    value={password}
                    name="password"
                    label="Password"
                    placeholder="Enter your Password"
                    onChange={onChangePassword}
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="password">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="confirm_password"
                    value={confirm_password}
                    onChange={onChangeConfirm_password}
                    validations={[required, cpassword]}
                  /> */}
                  <InputField
                    type="password"
                    value={confirm_password}
                    name="confirm_password"
                    label="Confirm password"
                    placeholder="Confirm Password"
                    onChange={onChangeConfirm_password}
                  />
                </div>
                <div className="form-group">
                  <button
                    className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                  <div className="form-group">
                    
                  <Link to="/login">

                  <button
                    className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                  >
                   Sign In
                  </button></Link>
                </div>
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
