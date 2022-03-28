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
  SET_MESSAGE
} from "./types";

import FleetDataService from "../services/FleetService";

export const createFleets = (formFleets) => async (dispatch) => {
  return FleetDataService.create(formFleets).then(
    (response) => {
      dispatch({
        type: CREATE_FLEET,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      console.log("response", response);

      return Promise.resolve();
    },
    (error) => {
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
        return Promise.reject();
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
        return Promise.reject();
      }
    }
  );
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

export const updateFleet = (id) => async (dispatch) => {
  return FleetDataService.update(id).then(
    (res) => {
      dispatch({
        type: UPDATE_FLEET,
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

export const updateBanner = (id) => async (dispatch) => {
  return FleetDataService.fleetBanner(id).then(
    (res) => {
      dispatch({
        type: UPDATE_BANNER,
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
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
        payload: res,
      });
    },
    (error) => {
      console.log(error.response.data);
    }
  );
};

