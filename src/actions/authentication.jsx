import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  VALIDATE_ACCOUNT,
} from "./types";

import AuthService from "../services/AuthenticationService";
export const register = (email, password, confirm_password) => (dispatch) => {
  return AuthService.register(email, password, confirm_password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const errors = error.response.data && error.response.data.errors;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) =>
          errors[key].map((item) => <li>{item}</li>)
        );
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      } else {
        const result = error.response.data && error.response.data.message;
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      }

      //   return Promise.reject();
    }
  );
};
export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const errors = error.response.data && error.response.data.errors;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) =>
          errors[key].map((item) => <li>{item}</li>)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        return Promise.reject();
      } else {
        const result = error.response.data && error.response.data.message;
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      }
    }
  );
};
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
  window.location.reload();
};

export const forgotPassword = (email) => (dispatch) => {
  return AuthService.forgotPassword(email).then(
    (data) => {
      dispatch({
        type: FORGOT_PASSWORD,
        // payload: { user: data },
      });
      dispatch({
        type: SET_MESSAGE,
        payload: data.message,
      });
      console.log(data);
      return Promise.resolve();
    },
    (error) => {
      const errors =
        error.response && error.response.data && error.response.data.errors;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) =>
          errors[key].map((item) => <li>{item}</li>)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      } else {
        const result =
          error.response && error.response.data && error.response.data.message;
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result)
        return Promise.reject();
      }
    }
  );
};

export const changePassword =
  (email, password, confirm_password) => (dispatch) => {
    return AuthService.changePassword(email, password, confirm_password).then(
      (data) => {
        dispatch({
          type: CHANGE_PASSWORD,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const errors = error.response.data && error.response.data.errors;
        if (typeof errors === "object") {
          const result = Object.keys(errors).map((key) =>
            errors[key].map((item) => <li>{item}</li>)
          );
          dispatch({
            type: LOGIN_FAIL,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: result,
          });
          return Promise.reject();
        } else {
          const result = error.response.data && error.response.data.message;
          dispatch({
            type: LOGIN_FAIL,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: result,
          });
          console.log(result);
          return Promise.reject();
        }
      }
    );
  };

export const validateAccount = (email, code) => (dispatch) => {
  return AuthService.validateAccount(email, code).then(
    (data) => {
      dispatch({
        type: VALIDATE_ACCOUNT,
        // payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const errors = error.response.data && error.response.data.errors;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) =>
          errors[key].map((item) => <li>{item}</li>)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        return Promise.reject();
      } else {
        const result = error.response.data && error.response.data.message;
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
        console.log(result);
        return Promise.reject();
      }
    }
  );
};
