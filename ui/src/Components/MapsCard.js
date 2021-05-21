import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GoogleMaps from "./Maps";

const useStyles = makeStyles({
  root: {
    height: 420,
    width: 300,
    maxWidth: 280,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 30,
    backgroundColor: "#424242",
  },
  media: {
    margin: 6,
  },
  map: {
    margin: 2,
  },
  actionArea: {
    height: 260,
    marginBottom: 40,
  },
  content: {
    margin: 2,
    height: 60,
  },
  actions: {
    marginTop: 20,
    marginLeft: 2,
    position: "relative",
  },
  name: {
    marginLeft: 0,
    marginTop: -50,
    marginBottom: 10,
    height: "100%",
    color: "white",
  },
  totalB: {
    marginLeft: 0,
    marginTop: 10,
    color: "rgba(255, 255, 255, 0.7)",
  },
  availableB: {
    marginLeft: 0,
    marginTop: 10,
    height: "100%",
    color: "rgba(255, 255, 255, 0.7)",
  },
  actionsAddress: {
    height: 20,
    marginTop: -30,
    float: "left",
    color: "#90caf9",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  actionsDirection: {
    marginTop: -30,
    height: 20,
    left: 70,
    float: "right",
    color: "#90caf9",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
});

const MapCards = ({ item, handleGetAddress, handleGetDirections }) => {
  const classes = useStyles();

  const hospital = item.hospital;
  const totalBeds = item.total_beds;
  const availableBeds = item.available_beds;
  const address = item.address;
  const lat = item.lat;
  const lng = item.long;
  const destinationLocation = { lat: lat, lng: lng };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea className={classes.actionArea}>
          <CardMedia className={classes.map}>
            <GoogleMaps lat={lat} lng={lng} showDirection={false} />
          </CardMedia>
        </CardActionArea>
        <CardContent className={classes.content}>
          <Typography
            className={classes.name}
            gutterBottom
            variant="h6"
            component="h4"
          >
            {hospital}
          </Typography>
          <Typography
            className={classes.totalB}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            Total Beds - {totalBeds}
          </Typography>
          <Typography
            className={classes.availableB}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            Available Beds - {availableBeds}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            size="medium"
            // color="inherit"
            className={classes.actionsAddress}
            onClick={() => {
              handleGetAddress(true, address);
            }}
          >
            Address
          </Button>
          <Button
            size="medium"
            // color="inherit"
            className={classes.actionsDirection}
            onClick={() => {
              handleGetDirections(true, destinationLocation);
            }}
          >
            Directions
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MapCards;
