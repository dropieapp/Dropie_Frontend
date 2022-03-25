import { combineReducers } from "redux";
import deliveries from "./deliveries";
import authentication from "./authentication";
// import { registration } from "./registration";
import message from "./message";
import { company_reducer, companyOnboardReducer } from "./company_info";
import staffReducer from "./staffs";

export default combineReducers({
  deliveries,
  authentication,
  // registration,
  message,
  company_reducer,
  staffReducer,
  companyOnboardReducer,
});
