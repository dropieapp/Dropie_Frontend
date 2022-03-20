import { authHeader } from "../_helpers";

const config = "https://apibeta.dropie.ng/api/";

export const userService = {
  login,
  logout,
  register,
  company_info,
  getAllFleet,
  add_agent,
  get_agents,
  add_fleet,
  verify_otp,
  add_vehicle_type,
  getVehicleType,
  //   getAll,
  //   getById,
  //   update,
  //   delete: _delete,
};

// login function
function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config}business/auth/login`, requestOptions)
    .then(handleLoginResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

// register function
function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${config}business/auth/register`, requestOptions).then(
    handleRegisterResponse
  );
}

// logout function
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("onboard");
  localStorage.removeItem("verify_otp");
  localStorage.removeItem("add_agent");
  localStorage.removeItem("get_agents");
  localStorage.removeItem("add_vehicle_type");
  localStorage.removeItem("getVehicleType");
  localStorage.removeItem("fleet");
}

// get all agents
function get_agents() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config}business/staff/agent`, requestOptions)
    .then(handleResponse)
    .then((get_agents) => {
      // store get agents details and jwt token in local storage to keep get agents logged in between page refreshes
      localStorage.setItem("get_agents", JSON.stringify(get_agents));

      return get_agents;
    });
}

// add an agent
function add_agent(info) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: info,
  };

  return fetch(`${config}business/staff/agent`, requestOptions)
    .then(handleResponse)
    .then((add_agent) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("add_agent", JSON.stringify(add_agent));
      window.location.reload();
      return add_agent;
    });
}

// get all fleet
function getAllFleet() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config}business/fleet/list`, requestOptions)
    .then(handleResponse)
    .then((fleet) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("fleet", JSON.stringify(fleet));

      return fleet;
    });
}

// add a fleet
function add_fleet(info) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: info,
  };

  return fetch(`${config}business/fleet`, requestOptions)
    .then(handleResponse)
    .then((add_fleet) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("add_fleet", JSON.stringify(add_fleet));
      window.location.reload();
      return add_fleet;
    });
}

// get vehicle types
function getVehicleType() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config}admin/vehicle`, requestOptions)
    .then(handleResponse)
    .then((getVehicleType) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("getVehicleType", JSON.stringify(getVehicleType));

      return getVehicleType;
    });
}

// add a vehicle type
function add_vehicle_type(info) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };

  return fetch(`${config}admin/vehicle`, requestOptions)
    .then(handleResponse)
    .then((add_vehicle_type) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem(
        "add_vehicle_type",
        JSON.stringify(add_vehicle_type)
      );
      // window.location.reload();
      return add_vehicle_type;
    });
}

// set the company info
function company_info(info) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: info,
  };

  return fetch(`${config}business/onboard`, requestOptions)
    .then(handleResponse)
    .then((onboard) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("onboard", JSON.stringify(onboard));
      window.location.reload();
      return onboard;
    });
}

// verify otp
function verify_otp(info) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };

  return fetch(`${config}business/validate-otp`, requestOptions)
    .then(handleResponse)
    .then((verify_otp) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("verify_otp", JSON.stringify(verify_otp));
      window.location.reload();
      return verify_otp;
    });
}

// register response
function handleRegisterResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const errors = (data && data.errors) || response.statusText;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) => errors[key]);
        return Promise.reject(result);
      } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    }

    return data;
  });
}

//responses
function handleResponse(response) {
  return response.json().then((text) => {
    const data = text;
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const errors = (data && data.errors) || response.statusText;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) => errors[key]);
        return Promise.reject(result);
      } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    }

    return data;
  });
}

//login response
function handleLoginResponse(response) {
  return response.json().then((text) => {
    const data = text;
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }
      const errors = (data && data.errors) || response.statusText;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) => errors[key]);
        return Promise.reject(result);
      } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    }

    return data;
  });
}

// dumps
// function getById(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(`${config}business/auth/register/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }
// function update(user) {
//   const requestOptions = {
//     method: "PUT",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   };

//   return fetch(`${config}business/auth/register/users/${user.id}`, requestOptions).then(
//     handleResponse
//   );
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: "DELETE",
//     headers: authHeader(),
//   };

//   return fetch(`${config}business/auth/register/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }
