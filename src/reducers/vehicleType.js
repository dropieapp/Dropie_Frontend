import { VEHILCLE_TYPE } from "../actions/types";

const initialState = [];

 const vehicleReducer = (vehicles = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case VEHILCLE_TYPE:
      return payload;
    default:
      return vehicles;
  }
};

export default vehicleReducer;