import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const GoogleMaps = ({ lat, lng }) => {
  const mapContainerStyle = {
    top: 0,
    width: "100%",
    height: 260,
  };
  const destination = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "<api key here>",
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={16}
      center={destination}
    >
      <Marker position={destination} />
    </GoogleMap>
  );
};

export default GoogleMaps;
