import axios from "axios";


export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

const config = "https://apibeta.dropie.ng/api/";

export const authenticationHeader = axios.create({
  baseURL: `${config}`,
  headers: {
    "Content-type": "application/json",
  }
});

export const normalHeader = axios.create({
  
  baseURL: `${config}`,
  headers: {
    "Content-type": "application/json",
    ...authHeader(),
  }
});


export const fileHeader = axios.create({
  baseURL: `${config}`,
  headers: {
    ...authHeader(),
  },
});



