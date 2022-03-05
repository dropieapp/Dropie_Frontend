// import { LoadScript } from "@react-google-maps/api";
import React from "react";
import Layout from "../components/Layout";
import Map from "../components/GoogleMaps";

const lib = ["places"];
const key = "AIzaSyBejFJDR_C27ByVSOz9SYrdlgf7nlouUKY"; // PUT GMAP API KEY HERE
function Package_tracking() {
  return (
    <Layout>
      {/* <LoadScript googleMapsApiKey={key} libraries={lib}>
        <Map key={key} />
      </LoadScript> */}
      {/* <div className="main-wrapper"> */}
      <Map />
      {/* </div> */}
    </Layout>
  );
}

export default Package_tracking;
