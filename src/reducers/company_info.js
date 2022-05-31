import { createSlice } from "@reduxjs/toolkit";
import { STORE_ONBOARD } from "../actions/types";

// Slice
const rootSlice = createSlice({
  name: "root",

  initialState: {
    FormStage: 1, // default page stage to show on page load
    FormInfo: "",
    FormUpload: "",
  },

  reducers: {
    formStage: (state, action) => {
      state.FormStage = action.payload;
    },
    formInfo: (state, action) => {
      state.FormInfo = action.payload;
    },
    formUpload: (state, action) => {
      state.FormUpload = action.payload;
    },
  },
});

// Actions
export const { formStage, formInfo, formUpload } = rootSlice.actions;
export const company_reducer = rootSlice.reducer;

const initialStates = [];

export const companyOnboardReducer = (onboarding = initialStates, action) => {
  const { type, payload } = action;

  switch (type) {
    case STORE_ONBOARD:
      return [...onboarding, payload];

    default:
      return onboarding;
  }
};
