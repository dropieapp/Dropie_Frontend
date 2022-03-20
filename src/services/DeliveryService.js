/*
  This File takes care of all 
  out delivery routes and Requests
*/

import { normalHeader } from "../http-common";

const getAll = () => {
  return normalHeader.get("/business/deliveries");
};

const get = (id) => {
  return normalHeader.get(`/albums/${id}`);
};

const create = (data) => {
  return normalHeader.post("/business/delivery", data);
};

const update = (id, data) => {
  return normalHeader.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
  return normalHeader.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return normalHeader.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return normalHeader.get(`/tutorials?title=${title}`);
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
