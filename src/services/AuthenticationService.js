// /*
//   This File takes care of all
//   out delivery routes and Requests
// */

// import { authenticationHeader } from "../http-common";

// const login = (data) => {
//   return authenticationHeader.post("business/auth/login", data);
// };

// const register = (data) => {
//   return authenticationHeader.post("business/auth/register", data);
// };

// // const logout = (data) => {
// //   return http.post("/business/delivery", data);
// // };

// const AuthenticationService = {
//     login,
//     register,
// };

// export default AuthenticationService;

import axios from "axios";
const API_URL = "https://apibeta.dropie.ng/api/";

const register = (email, password, confirm_password) => {
  return axios.post(API_URL + "business/auth/register", {
    email,
    password,
    confirm_password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "business/auth/login", {
      email,
      password,
    })
    .then((response) => {
      console.log("response", response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("onboard");
  localStorage.removeItem("vehicle_type");
  localStorage.removeItem("add_fleets");
  localStorage.removeItem("get_agents");
  localStorage.removeItem("get_fleets");
  localStorage.removeItem("add_agents");
  localStorage.removeItem("verify_otp");
  localStorage.removeItem("fleet_banner");
  localStorage.removeItem("add_agent");
  localStorage.removeItem("fleet_status");
  localStorage.removeItem("invoices");
  localStorage.removeItem("update_fleets");
};
export default {
  register,
  login,
  logout,
};
