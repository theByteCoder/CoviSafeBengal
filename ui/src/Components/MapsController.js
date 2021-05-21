import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MapCards from "./MapsCard";
import DirectionController from "./DirectionController";
import AddressController from "./AddressController";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 100,
    flexGrow: 1,
    backgroundColor: "#333",
    // filter: "brightness(80%)",
  },
  control: {
    padding: theme.spacing(2),
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
    fetch("http://127.0.0.1:7070/location/current/").then((response) => {
      if (response.ok) {
        response.json().then((response) => {
          setOrigin({
            lat: response.response.lat,
            lng: response.response.lng,
          });
        });
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0}>
            {requestedData.map((value, index) => (
              <Grid key={index} item>
                <MapCards
                  item={value}
                  handleGetAddress={handleGetAddress}
                  handleGetDirections={handleGetDirections}
                  key={index}
                />
              </Grid>
            ))}
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
