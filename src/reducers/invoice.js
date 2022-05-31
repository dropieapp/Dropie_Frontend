import {
  CREATE_INVOICE,
  RETRIEVE_INVOICES,
  RETRIEVE_INVOICE,
  UPDATE_INVOICE,
  // CREATE_PRICE,
  // RETRIEVE_PRICES,
  // UPDATE_PRICE,
  // DELETE_PRICE
} from "../actions/types";

const initialState = [];

const invoiceReducer = (invoices = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INVOICE:
      return { ...invoices, ...payload };

    case RETRIEVE_INVOICES:
      return payload;

    case RETRIEVE_INVOICE:
      return payload;

    case UPDATE_INVOICE:
      return invoices.map((invoice) => {
        if (invoice.id === payload.id) {
          return {
            ...invoice,
            ...payload,
          };
        } else {
          return invoice;
        }
      });

    default:
      return invoices;
  }
};

export default invoiceReducer;
