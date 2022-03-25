import {
  STORE_ONBOARD,
  STORE_ONBOARD_FAIL,
  VERIFY_OTP,
  VERIFY_OTP_FAIL,
  SET_MESSAGE,
} from "./types";

import OnboardService from "../services/OnboardService";

export const onboarding = (formInfo) => async (dispatch) => {
  try {
    const res = await OnboardService.onboard(formInfo);

    dispatch({
      type: STORE_ONBOARD,
      payload: res.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });
    console.log("response", res);
    localStorage.setItem("onboard", JSON.stringify(res.data));

    return Promise.resolve(res.data);
  } catch (err) {
    const errors = err.response.data && err.response.data.errors;
    if (typeof errors === "object") {
      const result = Object.keys(errors).map((key) =>
        errors[key].map((item) => <li>{item}</li>)
      );
      dispatch({
        type: STORE_ONBOARD_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject();
    } else {
      const result = err.response.data && err.response.data.message;
      dispatch({
        type: STORE_ONBOARD_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject();
    }

    // return Promise.reject(err);
  }
};

// export const onboard =
//   (
//     business_name,
//     manager_name,
//     email,
//     website,
//     phone_number,
//     tin,
//     logo,
//     cac,
//     nipost,
//     address_proof
//   ) =>
//   (dispatch) => {
//     return OnboardService.onboard({
//       business_name,
//       manager_name,
//       email,
//       website,
//       phone_number,
//       tin,
//       logo,
//       cac,
//       nipost,
//       address_proof,
//     }).then(
//       (response) => {
//         dispatch({
//           type: STORE_ONBOARD,
//         });
//         dispatch({
//           type: SET_MESSAGE,
//           payload: response.data.message,
//         });

//         return Promise.resolve();
//       },
//       (error) => {
//         const errors = error.response.data && error.response.data.errors;
//         if (typeof errors === "object") {
//           const result = Object.keys(errors).map((key) =>
//             errors[key].map((item) => <li>{item}</li>)
//           );
//           dispatch({
//             type: STORE_ONBOARD_FAIL,
//           });
//           dispatch({
//             type: SET_MESSAGE,
//             payload: result,
//           });
//           console.log(result);
//           return Promise.reject();
//         } else {
//           const result = error.response.data && error.response.data.message;
//           dispatch({
//             type: STORE_ONBOARD_FAIL,
//           });
//           dispatch({
//             type: SET_MESSAGE,
//             payload: result,
//           });
//           console.log(result);
//           return Promise.reject();
//         }

//         //   return Promise.reject();
//       }
//     );
//   };

export const verifyOtp = (phone_number, otp) => (dispatch) => {
  return OnboardService.verify_otp({ phone_number, otp }).then(
    (response) => {
      dispatch({
        type: VERIFY_OTP,
        payload: response.data,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      localStorage.setItem("verify_otp", JSON.stringify(response.data));
      window.location.reload();

      return Promise.resolve();
    },
    (error) => {
      const errors = error.response.data && error.response.data.errors;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) =>
          errors[key].map((item) => <li>{item}</li>)
        );
        dispatch({
          type: VERIFY_OTP_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      } else {
        const result = error.response.data && error.response.data.message;
        dispatch({
          type: VERIFY_OTP_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      }

      //   return Promise.reject();
    }
  );
};
