import { userConstants } from "../_constants";

export function addFleet(state = {}, action) {
  switch (action.type) {
    case userConstants.ADD_FLEET_REQUEST:
      return { registering: true };
    case userConstants.ADD_FLEET_SUCCESS:
      return {};
    case userConstants.ADD_FLEET_FAILURE:
      return {};
    default:
      return state;
  }
}
