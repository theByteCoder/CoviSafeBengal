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

const Main = ({ data, selectedDistrict, type, cardType, pleaseSelectText }) => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      {!isEmpty(data) && selectedDistrict.length && type.length ? (
        <MapsController
          data={data}
          selectedDistrict={selectedDistrict}
          type={type}
          cardType={cardType}
        />
      ) : (
        <Toastbar showSnack={true} text={pleaseSelectText} variant="info" />
      )}
    </div>
  );
};

export default Main;
