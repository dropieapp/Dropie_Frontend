import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { company_reducer } from "./compnay_info.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  company_reducer,
  alert,
});

export default rootReducer;
