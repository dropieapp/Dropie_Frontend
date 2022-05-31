/**
 * Main Actions to be dispatched
 */

import {
  CREATE_DELIVERY,
  RETRIEVE_DELIVERIES,
  FILTERBYSTATUS,
  FILTERBYDATE,
  SET_MESSAGE,
  GET_RIDERS
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
    console.log("delivery", response.data);

    return Promise.resolve(response.data);
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
      return Promise.reject(result);
    } else {
      const result = error.response.data && error.response.data.message;
      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
      console.log(result);
      return Promise.reject(result);
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

export const filterByStatus = (status) => async (dispatch) => {
  try {
    const res = await DeliveryDataService.filtersByStatus(status);
    dispatch({
      type: FILTERBYSTATUS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}
 
export const filterByDate = (date) => async (dispatch) => {
  try {
    const res = await DeliveryDataService.filtersByDate(date);
    dispatch({
      type: FILTERBYDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const getRiders = (data) => async (dispatch) => {
  try {
    const res = await DeliveryDataService.getRiders(data);
    dispatch({
      type: GET_RIDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}


