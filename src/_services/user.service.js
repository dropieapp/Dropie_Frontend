import { authHeader } from "../_helpers";

const config = "http://apibeta.dropie.ng/api/";

export const userService = {
  login,
  logout,
  register,
  company_info,
  getAllFleet,
  verify_otp,
  //   getAll,
  //   getById,
  //   update,
  //   delete: _delete,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(
    `https://apibeta.dropie.ng/api/business/auth/login`,
    requestOptions
  )
    .then(handleLoginResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("onboard");
  localStorage.removeItem("verify_otp");
  localStorage.removeItem("fleet");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `https://apibeta.dropie.ng/api/business/auth/register/users`,
    requestOptions
  )
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}
function getAllFleet() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://apibeta.dropie.ng/api/business/fleet/list`,
    requestOptions
  )
    .then(handleResponse)
    .then((fleet) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("fleet", JSON.stringify(fleet));

      return fleet;
    });
}

// function getById(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(`http://apibeta.dropie.ng/api/business/auth/register/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(
    `http://apibeta.dropie.ng/api/business/auth/register`,
    requestOptions
  ).then(handleRegisterResponse);
}

function company_info(info) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: info,
  };

  return fetch(`http://apibeta.dropie.ng/api/business/onboard`, requestOptions)
    .then(handleResponse)
    .then((onboard) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("onboard", JSON.stringify(onboard));
      window.location.reload();
      return onboard;
    });
}
function verify_otp(info) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };

  return fetch(
    `http://apibeta.dropie.ng/api/business/validate-otp`,
    requestOptions
  )
    .then(handleResponse)
    .then((verify_otp) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("verify_otp", JSON.stringify(verify_otp));
window.location.reload();
      return verify_otp;
    });
}

// function update(user) {
//   const requestOptions = {
//     method: "PUT",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   };

//   return fetch(`http://apibeta.dropie.ng/api/business/auth/register/users/${user.id}`, requestOptions).then(
//     handleResponse
//   );
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: "DELETE",
//     headers: authHeader(),
//   };

//   return fetch(`http://apibeta.dropie.ng/api/business/auth/register/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }

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
