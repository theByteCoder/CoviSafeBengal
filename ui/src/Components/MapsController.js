import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MapCards from "./MapsCard";
import DirectionController from "./DirectionController";
import AddressController from "./AddressController";
import Toastbar from "./Toastbar";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 100,
    flexGrow: 1,
    backgroundColor: "#333",
    // filter: "brightness(80%)",
  },
}));

const MapsController = ({ allData, selectedDistrict, type }) => {
  const classes = useStyles();

  const [requestedData, setRequestedData] = useState([]);

  useEffect(() => {
    if (allData) {
      setRequestedData(allData[selectedDistrict][type]);
    }
  }, [allData, selectedDistrict, type]);

  const [getAddress, setGetAddress] = useState(false);
  const [address, setAddress] = useState({});
  const handleGetAddress = (showAddress, address = "") => {
    setAddress(address);
    setGetAddress(showAddress);
  };

  const [getDirections, setGetDirections] = useState(false);
  const handleGetDirections = (showDirection, destinationLocation = {}) => {
    setDestination(destinationLocation);
    setGetDirections(showDirection);
  };

  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setOrigin({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    // fetch("https://f30e157a8138.ngrok.io/location/current/").then(
    //   (response) => {
    //     if (response.ok) {
    //       response.json().then((response) => {
    //         setOrigin({
    //           lat: response.response.lat,
    //           lng: response.response.lng,
    //         });
    //       });
    //     }
    //   }
    // );
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container>
            {requestedData.length ? (
              requestedData.map((value, index) => (
                <Grid key={index} item>
                  <MapCards
                    item={value}
                    handleGetAddress={handleGetAddress}
                    handleGetDirections={handleGetDirections}
                    key={index}
                  />
                </Grid>
              ))
            ) : (
              <Toastbar
                showSnack={true}
                text={"No data found"}
                variant="error"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      {getAddress && (
        <AddressController
          isOpen={getAddress}
          handleGetAddress={handleGetAddress}
          address={address}
        />
      )}
      {getDirections && (
        <DirectionController
          isOpen={getDirections}
          handleGetDirections={handleGetDirections}
          destLoc={destination}
          origin={origin}
        />
      )}
    </div>
  );
};

export default MapsController;
