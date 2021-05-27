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
    height: 500,
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
    marginTop: -45,
    marginBottom: 10,
    height: "100%",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.7)",
  },
  totalB: {
    marginLeft: 0,
    marginTop: 45,
    color: "rgba(255, 255, 255, 0.7)",
  },
  availableB: {
    marginLeft: 0,
    marginTop: 8,
    height: "100%",
    color: "rgba(255, 255, 255, 0.7)",
  },
  actionsAddress: {
    height: 20,
    marginTop: 15,
    float: "left",
    color: "#90caf9",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  actionsContact: {
    marginTop: 5,
    height: 20,
    left: 89,
    float: "right",
    color: "#90caf9",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  actionsDirection: {
    height: 0,
    top: -20,
    float: "left",
    color: "#90caf9",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  actionsRegister: {
    top: -20,
    height: 0,
    left: 70,
    float: "right",
    color: "#90caf9",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  updatedOn: {
    fontSize: 12,
    marginLeft: 20,
    color: "rgba(255, 255, 255, 0.7)",
  },
});

const MapsCardTypeOne = ({
  item,
  handleGetAddress,
  handleGetContact,
  handleGetDirections,
  handleGetRegistration,
  dataUpdatedAt,
}) => {
  const classes = useStyles();

  const hospital = item.hospital;
  const totalBeds = item.total_beds;
  const availableBeds = item.available_beds;
  const address = item.address;
  const contact = item.contact;
  const onlineRegistration = item.online_registration;
  const lastUpdated = dataUpdatedAt;
  const lat = item.lat;
  const lng = item.lng;
  const destinationLocation = { lat: lat, lng: lng };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea className={classes.actionArea}>
          <CardMedia data-test={"hook-google-map"} className={classes.map}>
            <GoogleMaps lat={lat} lng={lng} showDirection={false} />
          </CardMedia>
        </CardActionArea>
        <CardContent className={classes.content}>
          <Typography
            data-test={"hook-hospital-name"}
            className={classes.name}
            gutterBottom
            variant="body1"
            component="h5"
          >
            {hospital}
          </Typography>
          <Typography
            data-test={"hook-total-beds"}
            className={classes.totalB}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            Total Beds - {totalBeds}
          </Typography>
          <Typography
            data-test={"hook-available-beds"}
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
            data-test={"hook-address-button"}
            size="medium"
            className={classes.actionsAddress}
            onClick={() => {
              handleGetAddress(true, address);
            }}
          >
            Address
          </Button>
          <Button
            data-test={"hook-contact-button"}
            size="medium"
            className={classes.actionsContact}
            onClick={() => {
              handleGetContact(true, contact);
            }}
          >
            Contact
          </Button>
        </CardActions>
        <CardActions className={classes.actions}>
          <Button
            data-test={"hook-directions-button"}
            size="medium"
            className={classes.actionsDirection}
            onClick={() => {
              handleGetDirections(true, destinationLocation);
            }}
          >
            Directions
          </Button>
          <Button
            data-test={"hook-register-button"}
            size="medium"
            className={classes.actionsRegister}
            onClick={() => {
              handleGetRegistration(onlineRegistration);
            }}
          >
            Register
          </Button>
        </CardActions>
        <div data-test={"hook-last-updated"} className={classes.updatedOn}>
          Last Updated On : {lastUpdated}
        </div>
      </Card>
    </>
  );
};

export default MapsCardTypeOne;
