/*
* THis file contains the reducers
* the reducer updates the state corresponding to dispatched Redux actions. 
*/
import {
  CREATE_FLEET,
  RETRIEVE_FLEETS,
  UPDATE_BANNER,
  UPDATE_STATUS,
  UPDATE_FLEET,
  VEHILCLE_TYPE
} from "../actions/types";

const initialState = [];

const fleetReducer = (fleets = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_FLEET:
      return [...fleets, payload];


    case RETRIEVE_FLEETS:
      return payload;
    
    case VEHILCLE_TYPE:
      return payload;

    case UPDATE_FLEET:
      return fleets.map((fleet) => {
        if (fleet.id === payload.id) {
          return {
            ...fleet,
            ...payload,
          };
        } else {
          return fleet;
        }
      });

    case UPDATE_STATUS:
      return fleets.map((fleet) => {
        if (fleet.id === payload.id) {
          return {
            ...fleet,
            ...payload,
          };
        } else {
          return fleet;
        }
      });
    case UPDATE_BANNER:
      return fleets.map((fleet) => {
        if (fleet.id === payload.id) {
          return {
            ...fleet,
            ...payload,
          };
        } else {
          return fleet;
        }
      });

    default:
      return fleets;
  }
};

export default fleetReducer;