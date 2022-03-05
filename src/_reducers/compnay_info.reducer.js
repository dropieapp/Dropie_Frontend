import { createSlice } from "@reduxjs/toolkit";

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

// import { userConstants } from "../_constants";

// export function users(state = {}, action) {
//     switch (action.type) {

//     // case userConstants.DELETE_SUCCESS:
//     //   // remove deleted user from state
//     //   return {
//     //     items: state.items.filter((user) => user.id !== action.id),
//     //   };
//     // case userConstants.DELETE_FAILURE:
//     //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user
//     //   return {
//     //     ...state,
//     //     items: state.items.map((user) => {
//     //       if (user.id === action.id) {
//     //         // make copy of user without 'deleting:true' property
//     //         const { deleting, ...userCopy } = user;
//     //         // return copy of user with 'deleteError:[error]' property
//     //         return { ...userCopy, deleteError: action.error };
//     //       }

//     //       return user;
//     //     }),
//     //   };
//     // default:
//     //   return state;
//   }
// }
