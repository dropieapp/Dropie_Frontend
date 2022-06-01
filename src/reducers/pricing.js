import {
  CREATE_PRICE,
  RETRIEVE_PRICES,
  UPDATE_PRICE,
  DELETE_PRICE,
} from "../actions/types";

const initialState = [];

const priceReducer = (prices = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PRICE:
      return { ...prices };

    case RETRIEVE_PRICES:
      return payload;

    case UPDATE_PRICE:
      return { ...prices };

    case DELETE_PRICE:
      return { ...prices };

    default:
      return prices;
  }
};

export default priceReducer;
