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
  return normalHeader.get(`/business/staff/agent/${id}`);
};

const create = (data) => {
  return axios({
    method: "post",
    url: API_URL + "business/staff/agent",
    data: data,
    headers: { "Content-Type": "multipart/form-data", ...authHeader() },
  }).then((response) => {
    localStorage.setItem("add_agents", JSON.stringify(response.data));
    return response.data;
  });
};

const status = (id, data) => {
  return normalHeader.post(`/business/staff/agent/status/${id}`, data);
};

const inviteManager = (data) => {
  return normalHeader.post(`/business/staff/invite`, data);
};

const verifyManager = (id) => {
  return fileHeader.get(`/business/staff/invite/${id}`);
};

const listManager = () => {
  return fileHeader.get(`/business/staff`);
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
