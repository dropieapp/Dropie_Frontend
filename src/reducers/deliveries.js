/*
* THis file contains the reducers
* the reducer updates the state corresponding to dispatched Redux actions. 
*/
import {
  CREATE_DELIVERY,
  RETRIEVE_DELIVERIES,
  FILTERBYSTATUS,
  FILTERBYDATE,
  GET_RIDERS,
} from "../actions/types";

const initialState = [];

const deliveryReducer = (deliveries = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_DELIVERY:
      return { ...deliveries };

    case RETRIEVE_DELIVERIES:
      return payload;
    
    case FILTERBYSTATUS:
      return payload;
    
    case FILTERBYDATE:
      return payload;
    
    default:
      return deliveries;
  }
};

export default deliveryReducer;