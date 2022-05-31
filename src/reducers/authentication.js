// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   LOGOUT,
// } from "../actions/types";

// let user = JSON.parse(localStorage.getItem("user"));
// const initialState = user ? { loggedIn: true, user } : {};

// export function authentication(state = initialState, action) {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return {
//         loggingIn: true,
//         user: action.user,
//       };
//     case LOGIN_SUCCESS:
//       return {
//         loggedIn: true,
//         user: action.user,
//       };
//     case LOGIN_FAILURE:
//       return {};
//     case LOGOUT:
//       return {};
//     default:
//       return state;
//   }
// }

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  VALIDATE_ACCOUNT,
} from "../actions/types";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    
    case FORGOT_PASSWORD:
      return {
        ...state,
        isLoggedIn: false,
      };
    
    case VALIDATE_ACCOUNT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      // return {
      //   ...state,
      //   isLoggedIn: false,
      //   user: null,
      // };
      return {};

    default:
      return state;
  }
}
