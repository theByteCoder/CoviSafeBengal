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
    height: 400,
    width: 400,
    maxWidth: 260,
    marginRight: 10,
    marginTop: 30,
    // backgroundColor: "#B0E0E6",
  },
  media: {
    margin: 6,
  },
  map: {
    margin: 2,
  },
  actionArea: {
    height: 200,
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
    float: "left",
  },
  actionsDirection: {
    paddingLeft: 60,
    float: "right",
  },
  name: {
    marginTop: -20,
    marginBottom: 10,
    height: "100%",
  },
  availableB: {
    marginTop: 10,
    marginBottom: 10,
    height: "100%",
  },
});

const MapCards = ({ item, handleGetAddress, handleGetDirections }) => {
  const classes = useStyles();

  const hospital = item.hospital;
  const district = item.district;
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
            variant="h8"
            component="h4"
          >
            {hospital}, {district}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
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
            color="primary"
            className={classes.actionsAddress}
            onClick={() => {
              handleGetAddress(true, address);
            }}
          >
            Address
          </Button>
          <Button
            size="medium"
            color="primary"
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
