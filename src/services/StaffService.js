/*
  This File takes care of all 
  out delivery routes and Requests
*/

import { normalHeader } from "../http-common";
import { fileHeader } from "../http-common";
import axios from "axios";
import { authHeader } from "../_helpers";
const API_URL = "https://apibeta.dropie.ng/api/";

const getAll = () => {
  return axios
    .get(API_URL + "business/staff/agent", {
      headers: { ...authHeader() },
    })
    .then((response) => {
      console.log("response", response);
      localStorage.setItem("get_agents", JSON.stringify(response.data));
      return response.data;
    });
};
const get = (id) => {
  return axios
    .get(API_URL + "business/staff/agent/" + id, {
      headers: { ...authHeader() },
    })
    .then((response) => {
      console.log("response", response);
      localStorage.setItem("get_agent", JSON.stringify(response.data));
      return response.data;
    });
};

// const create = (data) => {
//   return axios.post(
//     API_URL + "business/staff/agent",
//     { ...data },
//     {
//       headers: { "Content-type": "multipart/form-data", ...authHeader() },
//     }
//   ).then((response) => {
//      localStorage.setItem("add_agents", JSON.stringify(response.data));
//     return response.data;
//   } );
// };
const create = (data) => {
  return fileHeader.post("/business/staff/agent", data);
};


const status = (id, data) => {
  return axios({
    method: "post",
    url: API_URL + "business/staff/agent/status/" + id,
    data: data,
    headers: { "Content-type": "application/json", ...authHeader() },
  }).then((response) => {
    localStorage.setItem("agents_status", JSON.stringify(response.data));
    return response.data;
  });
};
const inviteManager = (data) => {
  return axios({
    method: "post",
    url: API_URL + "business/staff/agent/invite",
    data: data,
    headers: { "Content-type": "application/json", ...authHeader() },
  }).then((response) => {
    localStorage.setItem("invite_manager", JSON.stringify(response.data));
    return response.data;
  });
};

const verifyManager = (id) => {
  return axios({
    method: "get",
    url: API_URL + "business/staff/agent/invite/" + id,
    headers: { ...authHeader() },
  }).then((response) => {
    localStorage.setItem("verify_manager", JSON.stringify(response.data));
    return response.data;
  });
};
const listManager = () => {
  return axios({
    method: "get",
    url: API_URL + "business/staff/",
    headers: { ...authHeader() },
  }).then((response) => {
    localStorage.setItem("list_staff", JSON.stringify(response.data));
    return response.data;
  });
};

const StaffService = {
  getAll,
  get,
  create,
  status,
  inviteManager,
  verifyManager,
  listManager,
};

export default StaffService;
