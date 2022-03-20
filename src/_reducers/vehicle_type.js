import { userConstants } from "../_constants";

export function addVehicleType(state = {}, action) {
  switch (action.type) {
    case userConstants.ADD_VEHICLE_TYPE_REQUEST:
      return { registering: true };
    case userConstants.ADD_VEHICLE_TYPE_SUCCESS:
      return {};
    case userConstants.ADD_VEHICLE_TYPE_FAILURE:
      return {};
    default:
      return state;
  }
}
