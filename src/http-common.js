import axios from "axios";
import { authHeader } from "./_helpers";

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



