import { combineReducers } from "redux";
import deliveries from "./deliveries";
import authentication from "./authentication";
// import { registration } from "./registration";
import message from "./message";


export default combineReducers({
  deliveries,
  authentication,
  // registration,
  message,
});
