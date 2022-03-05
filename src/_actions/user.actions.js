import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  upload_companyinfo,
  getAll,
  getAllFleet,
  delete: _delete,
};

function login(email, password, from) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        history.push(from);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success(user));
        history.push("/login");
        dispatch(
          alertActions.success(
            "Registration successful.\n Login with you details"
          )
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getAllFleet() {
  return (dispatch) => {
    dispatch(request());

    userService.getAllFleet().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALLFLEET_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALLFLEET_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALLFLEET_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

// Upload all the company info and details
function upload_companyinfo(info) {
  return (dispatch) => {
    dispatch(request(info));

    userService.company_info(info).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.COMPANY_REQUEST };
  }
  function success(company_info) {
    return { type: userConstants.COMPANY_SUCCESS, company_info };
  }
  function failure(error) {
    return { type: userConstants.COMPANY_FAILURE, error };
  }
}
