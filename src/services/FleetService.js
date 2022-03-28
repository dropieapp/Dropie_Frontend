import axios from "axios";
import { authHeader } from "../_helpers";
const API_URL = "https://apibeta.dropie.ng/api/";

const getAll = () => {
  return axios
    .get(API_URL + "business/fleet/list", {
      headers: { ...authHeader() },
    })
    .then((response) => {
      console.log("response", response);
      localStorage.setItem("get_fleets", JSON.stringify(response.data));
      return response.data;
    });
};

const create = (data) => {
  // return axios({
  //   method: "post",
  //   url: API_URL + "business/fleet",
  //   data: data,
  //   headers: { "Content-Type": "multipart/form-data", ...authHeader() },
  // }).then((response) => {
  //   localStorage.setItem("add_fleets", JSON.stringify(response.data));
  //   return response.data;
  // });

  return axios.post(
    API_URL + "business/fleet",
    { ...data },
    { headers: authHeader() }
  );
};
const fleetStatus = (id, data) => {
  return axios({
    method: "post",
    url: API_URL + "business/fleet/status/" + id,
    data: data,
    headers: { "Content-type": "application/json", ...authHeader() },
  }).then((response) => {
    localStorage.setItem("fleet_status", JSON.stringify(response.data));
    return response.data;
  });
};
const fleetBanner = (id, data) => {
  return axios({
    method: "post",
    url: API_URL + "business/fleet/banner/" + id,
    data: data,
    headers: { "Content-Type": "multipart/form-data", ...authHeader() },
  }).then((response) => {
    localStorage.setItem("fleet_banner", JSON.stringify(response.data));
    return response.data;
  });
};
const update = (id, data) => {
  return axios({
    method: "post",
    url: API_URL + "business/fleet/update/" + id,
    data: data,
    headers: { "Content-type": "application/json", ...authHeader() },
  }).then((response) => {
    localStorage.setItem("fleet_update", JSON.stringify(response.data));
    return response.data;
  });
};
const vehicleType = () => {
  return axios({
    method: "get",
    url: API_URL + "admin/vehicle",
    headers: { ...authHeader() },
  }).then((response) => {
    localStorage.setItem("vehicle_type", JSON.stringify(response.data));
    return response.data;
  });
};

const FleetService = {
  getAll,
  create,
  fleetStatus,
  update,
  fleetBanner,
  vehicleType,
};

export default FleetService;
