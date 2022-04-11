/**
 * Main Actions to be dispatched
 */

import {
  CREATE_FLEET,
  CREATE_FLEET_FAIL,
  RETRIEVE_FLEETS,
  UPDATE_STATUS,
  UPDATE_BANNER,
  UPDATE_FLEET,
  VEHILCLE_TYPE,
  SET_MESSAGE,
  UPDATE_FLEET_FAIL,
} from "./types";

import FleetDataService from "../services/FleetService";

export const createFleets = (formFleets) => async (dispatch) => {
  try {
    const res = await FleetDataService.create(formFleets);
    dispatch({
      type: CREATE_FLEET,
      payload: res.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });
    console.log("res", res);
    localStorage.setItem("add_fleets", JSON.stringify(res.data));

    return Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
    const errors = error.response.data && error.response.data.errors;
    if (typeof errors === "object") {
      const result = Object.keys(errors).map((key) =>
        errors[key].map((item) => <li>{item}</li>)
      );
      dispatch({
        type: CREATE_FLEET_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject(result);
    } else {
      const result = error.response.data && error.response.data.message;
      dispatch({
        type: CREATE_FLEET_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject(result);
    }
  }
};

export const retrieveFleets = () => (dispatch) => {
  return FleetDataService.getAll().then(
    (res) => {
      dispatch({
        type: RETRIEVE_FLEETS,
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

export const updateFleet = (id, data) => async (dispatch) => {
  try {
    const res = await FleetDataService.update(id, data);
    console.log("res", res);

    dispatch({
      type: UPDATE_FLEET,
      payload: res,
    });
     dispatch({
       type: SET_MESSAGE,
       payload: res.data.message,
     });
    localStorage.setItem("update_fleets", JSON.stringify(res.data));

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    const errors = err.response.data && err.response.data.errors;
    if (typeof errors === "object") {
      const result = Object.keys(errors).map((key) =>
        errors[key].map((item) => <li>{item}</li>)
      );
      dispatch({
        type: UPDATE_FLEET_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject(result);
    } else {
      const result = error.response.data && error.response.data.message;
      dispatch({
        type: UPDATE_FLEET_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject(result);
    }
  }
};
export const updateBanner = (id, data) => async (dispatch) => {
  try {
    const res = await FleetDataService.fleetBanner(id, data);

    dispatch({
      type: UPDATE_BANNER,
      payload: res.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });
    localStorage.setItem("fleet_banner", JSON.stringify(res.data));

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    const errors = err.response.data && err.response.data.errors;
    if (typeof errors === "object") {
      const result = Object.keys(errors).map((key) =>
        errors[key].map((item) => <li>{item}</li>)
      );
      dispatch({
        type: UPDATE_FLEET_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject(result);
    } else {
      const result = error.response.data && error.response.data.message;
      dispatch({
        type: UPDATE_FLEET_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject(result);
    }
  }
};



export const updateStatus = (id) => async (dispatch) => {
  return FleetDataService.fleetstatus(id).then(
    (res) => {
      dispatch({
        type: UPDATE_STATUS,
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

export const vehicleType = () => async (dispatch) => {
  return FleetDataService.vehicleType().then(
    (res) => {
      dispatch({
        type: VEHILCLE_TYPE,
        payload: res.data,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};
