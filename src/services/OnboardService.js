// import axios from "axios";
// const API_URL = "https://apibeta.dropie.ng/api/";
// import { authHeader } from "../_helpers";

// const onboard = (
//   business_name,
//   manager_name,
//   email,
//   website,
//   phone_number,
//   tin,
//   logo,
//   cac,
//   nipost,
//   address_proof
// ) => {
//   return axios
//     .post(
//       API_URL + "business/onboard",
//       {
//         business_name,
//         manager_name,
//         email,
//         website,
//         phone_number,
//         tin,
//         logo,
//         cac,
//         nipost,
//         address_proof,
//       },
//       {
//         headers: { ...authHeader },
//       }
//     )
//     .then((response) => {
//       console.log("response", response);
//       localStorage.setItem("onboard", JSON.stringify(response));
//       return response;
//     });
// };

// const verify_otp = (phone_number, otp) => {
//   return axios
//     .post(
//       API_URL + "business/validate-otp",
//       {
//         phone_number,
//         otp,
//       },
//       { headers: { ...authHeader } }
//     )
//     .then((response) => {
//       console.log("response", response);
//       localStorage.setItem("verify_otp", JSON.stringify(response));
//       return response;
//     });
// };

// const OnboardService = {
//   onboard,
//   verify_otp,
// };

// export default OnboardService;

/*
  This File takes care of all 
  out delivery routes and Requests
*/

import { fileHeader } from "../http-common";

const onboard = (data) => {
  return fileHeader.post("/business/onboard", data);
};
const verify_otp = (data) => {
  return fileHeader.post("/business/validate-otp", data);
};


const OnboardService = {
  onboard,
  verify_otp
};

export default OnboardService;
