import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import { isEmpty } from "lodash";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MapDirectionsRenderer from "./MapDirectionsRenderer";
import Typography from "@material-ui/core/Typography";
// import TravelMode from "./TravelMode";

const useStyles = makeStyles((theme) => ({
  popupBox: {
    position: "fixed",
    background: "#00000050",
    width: "100%",
    height: "91%",
    top: 60,
    // to be used for travel mode
    // height: "110vh",
    // top: -10,
    left: 0,
  },
  box: {
    top: 40,
    position: "relative",
    width: "84%",
    height: "70%",
    margin: "0 auto",
    marginTop: "calc(100vh - 85vh - 20px)",
    backgroundColor: "rgba(128,0,0,0.85)",
    borderRadius: "4px",
    padding: "12px",
    border: "1px solid #999",
  },
  closeIcon: {
    content: "x",
    cursor: "pointer",
    position: "absolute",
    top: -10,
    right: -13,
    background: "#ededed",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    lineHeight: "20px",
    textAlign: "center",
    border: "1px solid #999",
    fontSize: "20px",
  },
  noInfoText: {
    color: "white",
  },
}));

const Directions = ({ handleClose, destLoc, origin }) => {
  const classes = useStyles();
  // to be used for travel mode
  //   const [travelMode, setTravelMode] = useState("DRIVING");
  //   const handleSetMode = (modeEvent) => {
  //     setTravelMode(modeEvent);
  //   };

  const directionMapContainerStyle = {
    width: "100%",
    height: "100%",
    // height: "90%", // to be used for travel mode
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  const places = [
    { latitude: origin.lat, longitude: origin.lng },
    { latitude: destLoc.lat, longitude: destLoc.lng },
  ];

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className={classes.popupBox}>
      <div className={classes.box}>
        <CancelIcon
          data-test={"hook-close-button"}
          className={classes.closeIcon}
          color="secondary"
          onClick={handleClose}
        />
        {/* to be used for travel mode */}
        {/* <TravelMode travelMode={travelMode} handleSetMode={handleSetMode} /> */}
        {!isEmpty(origin) ? (
          <GoogleMap
            mapContainerStyle={directionMapContainerStyle}
            zoom={12}
            center={origin}
            gestureHandling="cooperative"
          >
            <MapDirectionsRenderer places={places} travelMode={"DRIVING"} />
          </GoogleMap>
        ) : (
          <Typography
            data-test={"hook-direction-text"}
            className={classes.noInfoText}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            Direction details unavailable.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Directions;
