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
//   return fileHeader.post("/business/staff/agent", data);
// };

const create = (data) => {
  return axios({
    method: "post",
    url: "https://apibeta.dropie.ng/api/business/staff/agent",
    data,
    headers: {
      ...authHeader(),
    },
  });
};


const status = (id, data) => {
  return normalHeader.post(API_URL + "business/staff/agent/status/" + id, data);
};

const inviteManager = (data) => {
  return normalHeader.post(API_URL + "business/staff/agent/invite", data);
};

const verifyManager = (id) => {
  return normalHeader.post(API_URL + "business/staff/verify/" + id);
};

const listManager = () => {
  return normalHeader.get(API_URL + "business/staff");
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
