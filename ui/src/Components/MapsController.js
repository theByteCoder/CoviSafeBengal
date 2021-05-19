import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import MapCards from "./MapsCard";
import Button from "@material-ui/core/Button";
import DirectionController from "./DirectionController";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const MapsController = () => {
  const classes = useStyles();
  const [dataGovt, setDataGovt] = useState([]);
  const [dataPvt, setDataPvt] = useState([]);

  const [currLoc, setCurrLoc] = useState({});

  const [displayData, setDisplayData] = useState([]);

  const [disableShowMore, setDisableShowMore] = useState(false);

  const [getDirections, setGetDirections] = useState(false);

  const [destinationLocation, setDestinationLocation] = useState({});

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
          setCurrLoc({ ...response.response });
        });
      }
    });
  }, []);

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={10}>
            {displayData.map((value, index) => (
              <Grid key={index} item>
                <MapCards
                  item={value}
                  handleGetDirections={handleGetDirections}
                  key={index}
                  currLoc={currLoc}
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
      {getDirections && (
        <DirectionController
          isOpen={getDirections}
          handleGetDirections={handleGetDirections}
          destLoc={destinationLocation}
          currLoc={currLoc}
        />
      )}
    </>
  );
};

export default MapsController;
