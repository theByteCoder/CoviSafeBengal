import React, { useEffect, useState } from "react";
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
    height: 680,
    maxWidth: 360,
    margin: 10,
  },
  media: {
    margin: 10,
  },
  map: {
    margin: 10,
  },
  action: {
    height: 600,
    marginBottom: 40,
  },
  directions: {
    position: "relative",
    float: "right",
  },
});

const MapCards = ({ item, handleGetDirections }) => {
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
        <CardActionArea className={classes.action}>
          <CardMedia className={classes.map}>
            <GoogleMaps lat={lat} lng={lng} showDirection={false} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {hospital}, {district}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {address}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Total Beds - {totalBeds}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Available Beds - {availableBeds}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.directions}>
          <Button
            size="medium"
            color="primary"
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
