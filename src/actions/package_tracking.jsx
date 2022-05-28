import { GET_PACKAGE_TRACKING } from "./types";

import PackageTrackingService from "../services/PackageTracking";

export const getPackageTracking = (id) => async (dispatch) => {
  try {
    const res = await PackageTrackingService.getPackageTracking(id);

    dispatch({
      type: GET_PACKAGE_TRACKING,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err.response);
    return Promise.reject(err);
  }
};
