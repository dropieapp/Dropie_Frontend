/*
  This File takes care of all 
  out delivery routes and Requests
*/

import { normalHeader } from "../http-common";

const getAll = () => {
  return normalHeader.get("/business/deliveries");
};

const create = (data) => {
  return normalHeader.post("/business/delivery", data);
};

const filtersByStatus = () => {
  return normalHeader.get("/business/delivery/filter/pending");
};



const DeliveryService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default DeliveryService;
