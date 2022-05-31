/*
  This File takes care of all 
  out delivery routes and Requests
*/

import axios from "axios";
import { normalHeader } from "../http-common";
import { authHeader } from "../_helpers";

const getAll = () => {

  return normalHeader.get("/business/delivery");
};

const create = (data) => {
  return normalHeader.post("/business/delivery", data);
};

const filtersByStatus = (status) => {
  return axios({
    method: "get",
    url: "https://apibeta.dropie.ng/api/business/delivery/filter/" + status,
    headers: {
      ...authHeader(),
    },
  });
  // return normalHeader.get("/business/delivery/filter/" + status);
};

const filterByDate = (date) => {
  
  return axios({
    method: "get",
    url: "https://apibeta.dropie.ng/api/business/delivery/filter/date/" + date,
    headers: {
      ...authHeader(),
    },
  });

  //apibeta.dropie.ng/api/business/delivery/filter/date/month
  // https: return normalHeader.get("/business/stats");
};

const getRiders = (data) => {
  return normalHeader.post("/business/get-riders", data);
};

const DeliveryService = {
  getAll,
  // get,
  create,
  filtersByStatus,
  filterByDate,
  getRiders,
  // update,
  // remove,
  // removeAll,
  // findByTitle,
};

export default DeliveryService;
