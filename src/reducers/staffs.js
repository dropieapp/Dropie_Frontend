/*
* THis file contains the reducers
* the reducer updates the state corresponding to dispatched Redux actions. 
*/
import {
  CREATE_AGENT,
  RETRIEVE_AGENTS,
  RETRIEVE_AGENT,
  UPDATE_AGENT_STATUS,
  LIST_MANAGERS,
  INVITE_MANAGER,
  VERIFY_MANAGER_INVITE
} from "../actions/types";

const initialState = [];

const staffReducer = (agents = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_AGENT:
      return [...agents, payload];

    case INVITE_MANAGER:
      return [...agents, payload];

    case RETRIEVE_AGENTS:
      return payload;

    case RETRIEVE_AGENT:
      return agents.map((agent) => {
        if (agent.id === payload.id) {
          return {
            ...agent,
            ...payload,
          };
        } else {
          return agent;
        }
      });

    case UPDATE_AGENT_STATUS:
      return agents.map((agent) => {
        if (agent.id === payload.id) {
          return {
            ...agent,
            ...payload,
          };
        } else {
          return agent;
        }
      });

    case VERIFY_MANAGER_INVITE:
      return agents.map((agent) => {
        if (agent.id === payload.id) {
          return {
            ...agent,
            ...payload,
          };
        } else {
          return agent;
        }
      });

    case LIST_MANAGERS:
      return payload;

    default:
      return agents;
  }
};

export default staffReducer;