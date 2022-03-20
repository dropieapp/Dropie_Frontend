import { userConstants } from "../_constants";

export function registerAgent(state = {}, action) {
  switch (action.type) {
    case userConstants.ADD_AGENT_REQUEST:
      return { registering: true };
    case userConstants.ADD_AGENT_SUCCESS:
      return {};
    case userConstants.ADD_AGENT_FAILURE:
      return {};
    case userConstants.ADD_AGENT_FAILURE_UPDATE:
      return { registering: false};
    default:
      return state;
  }
}
