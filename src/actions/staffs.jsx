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

export const createAgent = (formInfo) => async (dispatch) => {
  try {
    const res = await AgentDataService.create(formInfo);

    dispatch({
      type: CREATE_AGENT,
      payload: res.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });
    localStorage.setItem("add_agent", JSON.stringify(res.data));

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    const errors = err.response.data && err.response.data.errors;
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
      const result = err.response.data && err.response.data.message;
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
};
// export const createAgent = (formAgents) => (dispatch) => {
//   return AgentDataService.create(formAgents).then(
//     (response) => {
//       dispatch({
//         type: CREATE_AGENT,
//       });
//       dispatch({
//         type: SET_MESSAGE,
//         payload: response.data.message,
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const errors = error.response.data && error.response.data.errors;
//       if (typeof errors === "object") {
//         const result = Object.keys(errors).map((key) =>
//           errors[key].map((item) => <li>{item}</li>)
//         );
//         dispatch({
//           type: CREATE_AGENT_FAIL,
//         });
//         dispatch({
//           type: SET_MESSAGE,
//           payload: result,
//         });
//         console.log(result);
//         return Promise.reject();
//       } else {
//         const result = error.response.data && error.response.data.message;
//         dispatch({
//           type: CREATE_AGENT_FAIL,
//         });
//         dispatch({
//           type: SET_MESSAGE,
//           payload: result,
//         });
//         console.log(result);
//         return Promise.reject();
//       }
//     }
//   );
// };

export const retrieveAgents = () => (dispatch) => {
  return AgentDataService.getAll().then(
    (res) => {
      dispatch({
        type: RETRIEVE_AGENTS,
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};
export const listManagers = () => (dispatch) => {
  return AgentDataService.listManager().then(
    (res) => {
      dispatch({
        type: LIST_MANAGERS,
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

export const retrieveAgent = (id) => async (dispatch) => {
  return AgentDataService.get(id).then(
    (res) => {
      dispatch({
        type: RETRIEVE_AGENT,
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

export const inviteManager = (data) => async (dispatch) => {
  return AgentDataService.inviteManager(data).then(
    (res) => {
      dispatch({
        type: INVITE_MANAGER,
        payload: res,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: res.message,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

export const updateAgentStatus = (id, data) => async (dispatch) => {
  return AgentDataService.status(id, data).then(
    (res) => {
      dispatch({
        type: UPDATE_AGENT_STATUS,
        payload: res,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: res.message,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

export const verifyInviteManager = (id) => async (dispatch) => {
  return AgentDataService.verifyManager(id).then(
    (res) => {
      dispatch({
        type: VERIFY_MANAGER_INVITE,
        payload: res,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: res.message,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};
