/**
 * Main Actions to be dispatched
 */

import {
  CREATE_DELIVERY,
  RETRIEVE_DELIVERIES,
  UPDATE_DELIVERY,
  DELETE_DELIVERY,
  DELETE_ALL_DELIVERIES,
} from "./types";

import DeliveryDataService from "../services/DeliveryService";


export const createDelivery = (delivery) => async (dispatch) => {
  try {
    const response = await DeliveryDataService.create(delivery);
    dispatch({
      type: CREATE_DELIVERY,
      // payload: response.data,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  } catch (error) {
    const errors = error.response.data && error.response.data.errors;
    if (typeof errors === "object") {
      const result = Object.keys(errors).map((key) =>
        errors[key].map((item) => <li>{item}</li>)
      );
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject();
    } else {
      const result = error.response.data && error.response.data.message;
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject();
    }
  }
};


export const retrieveDeliveries = () => async (dispatch) => {
  try {
    const res = await DeliveryDataService.getAll();

    dispatch({
      type: RETRIEVE_DELIVERIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateDelivery = (id, data) => async (dispatch) => {
  try {
    const res = await DeliveryDataService.update(id, data);

    dispatch({
      type: UPDATE_DELIVERY,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDelivery = (id) => async (dispatch) => {
  try {
    await DeliveryDataService.remove(id);

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
    const res = await DeliveryDataService.removeAll();

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
    const res = await DeliveryDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_DELIVERIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
