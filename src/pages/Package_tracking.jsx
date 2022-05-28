import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPackageTracking } from "../actions/package_tracking";
import Map from "../components/Map";
import { LoadScript } from "@react-google-maps/api";

const lib = ["places"];
const key = "AIzaSyBejFJDR_C27ByVSOz9SYrdlgf7nlouUKY"; // PUT GMAP API KEY HERE

const Package_tracking = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const id = location.pathname.split("/")[2];
  let { id } = useParams();

  // console.log("location", id);

  // const [tracking, setTracking] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tracking = useSelector((state) => state.packageTracking.data);

  useEffect(() => {
    dispatch(getPackageTracking(id))
      .then((response) => {
        setIsLoading(false);
        toast("Package Tracking Loaded", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast("Error Loading Package Tracking", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  }, [dispatch]);
  // console.log(tracking && tracking.agent.locations[0].lng);
  // console.log(tracking);
  return (
    <div>
     
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        {tracking && <Map key={key} data={tracking} origin={tracking.pickup_address} destination={tracking.delivery_address} />}
      </LoadScript>
    </div>
  );
};
export default Package_tracking;
