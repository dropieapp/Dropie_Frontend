import {
      CREATE_PRICE,
    RETRIEVE_PRICES,
  SET_MESSAGE,
  UPDATE_PRICE,
  DELETE_PRICE
} from "./types";

import PricingDataService from "../services/PricingService";

export const getPrices = () => async (dispatch) => { 
    PricingDataService.getPrices().then(
      (res) => {
        dispatch({
          type: RETRIEVE_PRICES,
          payload: res.data,
        });
        localStorage.setItem("prices", JSON.stringify(res.data));
      },
      (error) => {
        console.log(error);
      }
    );
}

export const createPrice = (price) => async (dispatch) => { 
    try {
        const res = await PricingDataService.createPrices(price);
        dispatch({
            type: CREATE_PRICE,
            payload: res.data,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: res.data.message,
        });
        return Promise.resolve(res.data);
    }
    catch (error) { 
        console.log(error);
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
}

export const updatePrices = (id, price) => async (dispatch) => { 
    try {
        const res = await PricingDataService.updatePrices(id, price);
        dispatch({
            type: UPDATE_PRICE,
            payload: res.data,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: res.data.message,
        });
        return Promise.resolve(res.data);
    }
    catch (error) { 
        console.log(error);
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
}

export const deletePrice = (id) => async (dispatch) => { 
    try {
        const res = await PricingDataService.deletePrices(id);
        dispatch({
            type: DELETE_PRICE,
            payload: res.data,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: res.data.message,
        });
        return Promise.resolve(res.data);
    }
    catch (error) { 
        console.log(error);
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
}