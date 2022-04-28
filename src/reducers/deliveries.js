/*
* THis file contains the reducers
* the reducer updates the state corresponding to dispatched Redux actions. 
*/
import {
  CREATE_DELIVERY,
  RETRIEVE_DELIVERIES,
  UPDATE_DELIVERY,
  DELETE_DELIVERY,
  DELETE_ALL_DELIVERIES,
} from "../actions/types";

const initialState = [];

const deliveryReducer = (deliveries = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_DELIVERY:
      return { ...deliveries };

    case RETRIEVE_DELIVERIES:
      return payload;

    case UPDATE_DELIVERY:
      return deliveries.map((delivery) => {
        if (delivery.id === payload.id) {
          return {
            ...delivery,
            ...payload,
          };
        } else {
          return delivery;
        }
      });

    case DELETE_DELIVERY:
      return deliveries.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_DELIVERIES:
      return [];

    default:
      return deliveries;
  }
};

export default deliveryReducer;