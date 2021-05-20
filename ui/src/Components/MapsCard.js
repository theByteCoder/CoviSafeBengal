import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GoogleMaps from "./Maps";

const useStyles = makeStyles({
  root: {
    height: 400,
    width: 300,
    maxWidth: 280,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: "#A52A2A",
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
  actionsAddress: {
    height: 20,
    marginTop: -80,
    float: "left",
    color: "white",
    backgroundColor: "#A0522D",
  },
  actionsDirection: {
    // paddingLeft: 60,
    marginTop: -80,
    height: 20,
    left: 52,
    float: "right",
    color: "white",
    backgroundColor: "#A0522D",
  },
  name: {
    marginLeft: -7,
    marginTop: -50,
    marginBottom: 10,
    height: "100%",
    color: "white",
  },
  totalB: {
    marginLeft: -7,
    marginTop: 10,
    color: "white",
  },
  availableB: {
    marginLeft: 20,
    marginTop: 10,
    height: "100%",
    color: "white",
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
          <Box display="flex">
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
          </Box>
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
