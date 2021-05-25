import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MapsController from "./MapsController";
import Toastbar from "./Toastbar";

import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  parent: {
    position: "absolute",
    background: "#333",
    marginTop: theme.spacing(20),
    marginLeft: 60,
  },
}));

const Main = ({
  hospitalsData,
  selectedDistrict,
  hospitalType,
  pleaseSelectText,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      {!isEmpty(hospitalsData) &&
      selectedDistrict.length &&
      hospitalType.length ? (
        <MapsController
          hospitalsData={hospitalsData}
          selectedDistrict={selectedDistrict}
          type={hospitalType}
        />
      ) : (
        <Toastbar showSnack={true} text={pleaseSelectText} variant="info" />
      )}
    </div>
  );
};

export default Main;
