import React, { Component } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const Map = ({ data, origin, destination }) => {
  const [response, setResponse] = React.useState(null);
  const [travelMode, setTravelMode] = React.useState("DRIVING");
  // const [origin, setOrigin] = React.useState("");
  // const [destination, setDestination] = React.useState("");

  //   console.log(data);
  // alert(data);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status == "OK" || response.status === "OVER_QUERY_LIMIT") {
        setTimeout(() => {}, 60000);
        setResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  };

  //   console.log(data);
  const checkDriving = ({ target: { checked } }) => {
    checked && setTravelMode("DRIVING");
  };

  const onMapClick = (event) => {
    console.log(event);
    // show an alert with the lat/lng
    // alert(`${event.latLng.lat()}, ${event.latLng.lng()}`);
  };

  return (
    <div class="w-full grid place-items-center h-screen bg-gray-400">
      <div class="bg-gray-400 w-full h-screen relative">
        <div className="map-container ">
          <GoogleMap
            // required
            id="direction-example"
            // required
            mapContainerStyle={{
              height: "900px",
              width: "100%",
            }}
            // required
            zoom={6}
            // required
            center={{
              lat: +data.agent.locations[0].lat,
              lng: +data.agent.locations[0].lng,
            }}
            // optional
            onClick={onMapClick}
            // optional
            onLoad={(map) => {
              console.log("DirectionsRenderer onLoad map: ", map);
            }}
            // optional
            onUnmount={(map) => {
              console.log("DirectionsRenderer onUnmount map: ", map);
            }}
          >
            {destination !== "" && origin !== "" && (
              <DirectionsService
                // required
                options={{
                  // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination: destination,
                  origin: origin,
                  travelMode: travelMode,
                }}
                // required
                callback={directionsCallback}
                // optional
                onLoad={(directionsService) => {
                  console.log(
                    "DirectionsService onLoad directionsService: ",
                    directionsService
                  );
                }}
                // optional
                onUnmount={(directionsService) => {
                  console.log(
                    "DirectionsService onUnmount directionsService: ",
                    directionsService
                  );
                }}
              />
            )}

            {response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  directions: response,
                }}
                // optional
                onLoad={(directionsRenderer) => {
                  console.log(
                    "DirectionsRenderer onLoad directionsRenderer: ",
                    directionsRenderer
                  );
                }}
                // optional
                onUnmount={(directionsRenderer) => {
                  console.log(
                    "DirectionsRenderer onUnmount directionsRenderer: ",
                    directionsRenderer
                  );
                }}
              />
            )}
          </GoogleMap>
        </div>
        <div class="absolute inset-0 flex justify-center items-center">
          <div class="bg-white rounded-lg shadow-lg p-4">
            {/* showing a table */}
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="text-left">Driver Info</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="text-left">Package Details</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="text-left">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="text-left">Vehicle Type</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="text-center">Delivery Address</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="text-center">Pickup Address</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="text-center">...</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100">
                <tr>
                  <td className="p-2 whitespace-no-wrap">
                    <div className="text-left">
                      {data.agent.first_name} {data.agent.last_name}
                    </div>
                  </td>
                  <td className="p-2 whitespace-no-wrap">
                    <div className="text-left">{data.description}</div>
                  </td>
                  <td className="p-2 whitespace-no-wrap">
                    <div className="text-left">
                      {data.status == "pending" ? (
                        <span className="text-red-500">Pending</span>
                      ) : (
                        <span className="text-green-500">Delivered</span>
                      )}
                    </div>
                  </td>
                  <td className="p-2 whitespace-no-wrap">
                    <div className="text-left">{data.vehicle_type}</div>
                  </td>
                  <td className="p-2 whitespace-no-wrap">
                    <div className="text-left">{data.delivery_address}</div>
                  </td>
                  <td className="p-2 whitespace-no-wrap">
                    <div className="text-left">{data.pickup_address}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
