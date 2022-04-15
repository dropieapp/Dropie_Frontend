import {
  CREATE_INVOICE,
  RETRIEVE_INVOICES,
  RETRIEVE_INVOICE,
  UPDATE_INVOICE,
  SET_MESSAGE,
  // CREATE_PRICE,
  // RETRIEVE_PRICES,
  // UPDATE_PRICE,
  // DELETE_PRICE
} from "./types";

import FinanceDataService from "../services/FinanceService";

export const createInvoice = (invoice) => async (dispatch) => {
  try {
      const res = await FinanceDataService.createInvoice(invoice);
      console.log("res", res);
    dispatch({
      type: CREATE_INVOICE,
      payload: res.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });
    console.log("res", res);
    localStorage.setItem("add_invoice", JSON.stringify(res.data));

    return Promise.resolve(res.data);
  } catch (error) {
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
};

export const retrieveInvoices = () => (dispatch) => {
  return FinanceDataService.getInvoices().then(
    (res) => {
      dispatch({
        type: RETRIEVE_INVOICES,
        payload: res.data,
      });
          localStorage.setItem("invoices", JSON.stringify(res.data));
    },
    (error) => {
      console.log(error);
    }
  );
};

export const retrieveInvoice = (id) => async (dispatch) => {
  try {
    const res = await FinanceDataService.getInvoice(id);
    dispatch({
      type: RETRIEVE_INVOICE,
      payload: res,
    });
    localStorage.setItem("retrive_invoice", JSON.stringify(res));
    return Promise.resolve(res);
  } catch (error) {
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
};

export const updateInvoice = (id, data) => async (dispatch) => {
  try {
    const res = await FinanceDataService.updateInvoice(id, data);
    dispatch({
      type: UPDATE_INVOICE,
      payload: res,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    });
    localStorage.setItem("update_invoice", JSON.stringify(res.data));

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    const errors = err.response.data && err.response.data.errors;
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

