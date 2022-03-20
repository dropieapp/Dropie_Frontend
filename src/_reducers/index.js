import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { company_reducer } from "./compnay_info.reducer";
import { registerAgent } from "./agent.reducer";
import { addVehicleType } from "./vehicle_type";
import { addFleet } from "./fleet.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  registerAgent,
  company_reducer,
  addVehicleType,
  addFleet,
  alert,
});

export default rootReducer;
