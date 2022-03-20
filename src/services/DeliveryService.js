/*
  This File takes care of all 
  out delivery routes and Requests
*/

import http from "../http-common";

const getAll = () => {
  return http.get("/business/deliveries");
};

const get = id => {
  return http.get(`/albums/${id}`);
};

const create = data => {
  return http.post("/business/delivery", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

const DeliveryService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default DeliveryService;
