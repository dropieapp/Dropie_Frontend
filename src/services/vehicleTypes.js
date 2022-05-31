import axios from "axios";
import { fileHeader, normalHeader } from "../http-common";
import { authHeader } from "../_helpers";
const API_URL = "https://apibeta.dropie.ng/api/";

const vehicleType = () => {
  return axios
    .get(API_URL + "admin/vehicle", {
      headers: { ...authHeader() },
    })
    .then((response) => {
      console.log("response", response);
      localStorage.setItem("vehicle_type", JSON.stringify(response.data));
      return response.data;
    });
};

const VehicleTypes = {
  vehicleType,
};

export default VehicleTypes;
