import axios from "axios";
import { authHeader } from "../_helpers";
const API_URL = "https://apibeta.dropie.ng/api/";

const getUserBoard = () => {
  return axios.get(API_URL + "/business/auth/register", {
    headers: authHeader(),
  });
};

export default {
  getUserBoard,
};
