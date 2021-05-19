import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MapCards from "./MapsCard";
import Button from "@material-ui/core/Button";
import DirectionController from "./DirectionController";
import AddressController from "./AddressController";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const MapsController = () => {
  const classes = useStyles();
  const [dataGovt, setDataGovt] = useState([]);
  const [dataPvt, setDataPvt] = useState([]);

  const [displayData, setDisplayData] = useState([]);

  const [disableShowMore, setDisableShowMore] = useState(false);

  const [getAddress, setGetAddress] = useState(false);
  const [address, setAddress] = useState({});

  const [getDirections, setGetDirections] = useState(false);
  const [destinationLocation, setDestinationLocation] = useState({});

  const [origin, setOrigin] = useState({});

  const handleGetAddress = (showAddress, address = "") => {
    setAddress(address);
    setGetAddress(showAddress);
  };

  const handleGetDirections = (showDirection, destinationLocation = {}) => {
    setDestinationLocation(destinationLocation);
    setGetDirections(showDirection);
  };

  useEffect(() => {
    if (displayData.length < dataGovt.length) {
      setDisableShowMore(false);
    } else if (displayData.length === dataGovt.length) {
      setDisableShowMore(true);
    }
  }, [displayData, dataGovt]);

  const handleShowMore = () => {
    setDisplayData(dataGovt.slice(0, displayData.length + 8));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:7070/address/all/").then((response) => {
      if (response.ok) {
        response.json().then((response) => {
          setDataGovt(response.response.govt);
          setDataPvt(response.response.pvt);
        });
      }
    });
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
    <>
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0}>
            {displayData.map((value, index) => (
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
      <Button
        variant="contained"
        color="primary"
        disabled={disableShowMore}
        onClick={handleShowMore}
      >
        {displayData.length === 0 ? "Search" : "Show More"}
      </Button>
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
          destLoc={destinationLocation}
          origin={origin}
        />
      )}
    </>
  );
};

export default MapsController;
