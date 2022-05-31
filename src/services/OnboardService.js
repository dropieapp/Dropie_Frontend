// import axios from "axios";
// const API_URL = "https://apibeta.dropie.ng/api/";
import { authHeader } from "../_helpers";

// const onboard = (
// data
// ) => {
//   return axios
//     .post(
//       API_URL + "business/onboard",
//       {
//         data,
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

// const onboard = (data) => {
//   return fileHeader.post("/business/onboard", data);
// }

// const verify_otp = (data) => {
//   return normalHeader.post("/business/validate-otp", data);
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

import axios from "axios";
import { fileHeader, normalHeader } from "../http-common";

const onboard = (data) => {
  return axios({
    method: "post",
    url: "https://apibeta.dropie.ng/api/business/onboard",
    data,
    headers: {
      ...authHeader(),
    },
  });
};
const verify_otp = (data) => {
  return normalHeader.post("/business/validate-otp", data);
};

const OnboardService = {
  onboard,
  verify_otp,
};

export default OnboardService;
