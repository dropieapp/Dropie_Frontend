/**
 * Main Actions to be dispatched
 */

import {
  CREATE_AGENT,
  CREATE_AGENT_FAIL,
  RETRIEVE_AGENTS,
  RETRIEVE_AGENT,
  UPDATE_AGENT_STATUS,
  LIST_MANAGERS,
  INVITE_MANAGER,
  VERIFY_MANAGER_INVITE,
  SET_MESSAGE,
} from "./types";

import AgentDataService from "../services/StaffService";

export const createAgent = (formAgents) => (dispatch) => {
  return AgentDataService.create(formAgents).then(
    (response) => {
      dispatch({
        type: CREATE_AGENT,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const errors = error.response.data && error.response.data.errors;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) =>
          errors[key].map((item) => <li>{item}</li>)
        );
        dispatch({
          type: CREATE_AGENT_FAIL,
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
          type: CREATE_AGENT_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      }
    }
  );
};

export const retrieveAgents = () => (dispatch) => {
  return AgentDataService.getAll().then(
    (res) => {
      dispatch({
        type: RETRIEVE_AGENTS,
        payload: res.data,
      });
    },
    (error) => {
      console.log(err.response.data);
    }
  );
};

// export const retrieveAgents = () => async (dispatch) => {
//   try {
//     const res = await AgentDataService.getAll();

//     dispatch({
//       type: RETRIEVE_AGENTS,
//       payload: res.data,
//     });
//     localStorage.setItem("get_agents", JSON.stringify(res.data));
//   } catch (err) {
//     console.log(err.response.data);
//   }
// };

export const listManagers = () => async (dispatch) => {
  try {
    const res = await AgentDataService.listManager();

    dispatch({
      type: LIST_MANAGERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveAgent = (id) => async (dispatch) => {
  try {
    const res = await AgentDataService.get(id);

    dispatch({
      type: RETRIEVE_AGENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const inviteManager = (data) => async (dispatch) => {
  try {
    const res = await AgentDataService.inviteManager(data);

    dispatch({
      type: INVITE_MANAGER,
      payload: res.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateAgentStatus = (id, data) => async (dispatch) => {
  try {
    const res = await AgentDataService.status(id, data);

    dispatch({
      type: UPDATE_AGENT_STATUS,
      payload: data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: result,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const verifyInviteManager = (id) => async (dispatch) => {
  try {
    const res = await AgentDataService.status(id);

    dispatch({
      type: VERIFY_MANAGER_INVITE,
      payload: res.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDelivery = (id) => async (dispatch) => {
  try {
    await AgentDataService.remove(id);

    dispatch({
      type: DELETE_DELIVERY,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllDeliveries = () => async (dispatch) => {
  try {
    const res = await AgentDataService.removeAll();

    dispatch({
      type: DELETE_ALL_DELIVERIES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findDeliveriesByTitle = (title) => async (dispatch) => {
  try {
    const res = await AgentDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_DELIVERIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
