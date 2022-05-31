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
  verify_otp,
  add_fleet,
  getAllFleet,
  add_vehicle_type,
  getVehicleType,
  add_agent,
  get_agents,
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

//add fleet
function add_fleet(info) {
  return (dispatch) => {
    dispatch(request(info));

    userService.add_fleet(info).then(
      (user) => dispatch(success(user)),
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: userConstants.ADD_FLEET_REQUEST };
  }
  function success(add_fleet) {
    return { type: userConstants.ADD_FLEET_SUCCESS, add_fleet };
  }
  function failure(error) {
    return { type: userConstants.ADD_FLEET_FAILURE, error };
  }
}

// get all fleet
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
// Validate OTP
function verify_otp(info) {
  return (dispatch) => {
    dispatch(request(info));

    userService.verify_otp(info).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.COMPANY_REQUEST };
  }
  function success(verify_otp) {
    return { type: userConstants.COMPANY_SUCCESS, verify_otp };
  }
  function failure(error) {
    return { type: userConstants.COMPANY_FAILURE, error };
  }
}

// Add agents
function add_agent(info) {
  return (dispatch) => {
    dispatch(request(info));

    userService.add_agent(info).then(
      (user) => dispatch(success(user)),
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(failure_update(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: userConstants.ADD_AGENT_REQUEST };
  }
  function success(add_agent) {
    return { type: userConstants.ADD_AGENT_SUCCESS, add_agent };
  }
  function failure(error) {
    return { type: userConstants.ADD_AGENT_FAILURE, error };
  }
  function failure_update(error) {
    return { type: userConstants.ADD_AGENT_FAILURE_UPDATE, error };
  }
}
// Get agents
function get_agents() {
  return (dispatch) => {
    dispatch(request());

    userService.get_agents().then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALLAGENTS_REQUEST };
  }
  function success(get_agents) {
    return { type: userConstants.GETALLAGENTS_SUCCESS, get_agents };
  }
  function failure(error) {
    return { type: userConstants.GETALLAGENTS_FAILURE, error };
  }
}

// Add vehicle type
function add_vehicle_type(info) {
  return (dispatch) => {
    dispatch(request(info));

    userService.add_vehicle_type(info).then(
      (user) => dispatch(success(user)),
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: userConstants.ADD_VEHICLE_TYPE_REQUEST };
  }
  function success(add_vehicle_type) {
    return { type: userConstants.ADD_VEHICLE_TYPE_SUCCESS, add_vehicle_type };
  }
  function failure(error) {
    return { type: userConstants.ADD_VEHICLE_TYPE_FAILURE, error };
  }
}
// get vehicle type
function getVehicleType() {
  return (dispatch) => {
    dispatch(request());

    userService.getVehicleType().then(
      (user) => dispatch(success(user)),
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GET_VEHICLE_TYPE_REQUEST };
  }
  function success(get_vehicle_type) {
    return { type: userConstants.GET_VEHICLE_TYPE_SUCCESS, get_vehicle_type };
  }
  function failure(error) {
    return { type: userConstants.GET_VEHICLE_TYPE_FAILURE, error };
  }
}
