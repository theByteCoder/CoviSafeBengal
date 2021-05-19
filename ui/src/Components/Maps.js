import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const GoogleMaps = ({ lat, lng }) => {
  const mapContainerStyle = {
    width: 340,
    height: 400,
  };
  const destination = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk",
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
