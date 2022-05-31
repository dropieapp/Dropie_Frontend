import { adminHeader } from "../http-common";

const getPackageTracking = (id) => {
  return adminHeader.get("/track-package/" + id);
};

const PackageTracking = {
  getPackageTracking,
};

export default PackageTracking;
