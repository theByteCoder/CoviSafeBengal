import React from "react";
import { isEmpty } from "lodash";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const GoogleMaps = ({ lat, lng, showDirection }) => {
  const mapContainerStyle = {
    width: 340,
    height: 400,
  };
  const directionMapContainerStyle = {
    width: 1250,
    height: 593,
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
      mapContainerStyle={
        showDirection ? directionMapContainerStyle : mapContainerStyle
      }
      zoom={16}
      center={destination}
    >
      <Marker key={1} position={destination} />
    </GoogleMap>
  );
};

export default GoogleMaps;
