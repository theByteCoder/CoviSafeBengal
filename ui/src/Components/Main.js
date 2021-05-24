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

const Main = ({ allData, selectedDistrict, hospitalType }) => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      {!isEmpty(allData) && selectedDistrict.length && hospitalType.length ? (
        <MapsController
          allData={allData}
          selectedDistrict={selectedDistrict}
          type={hospitalType}
        />
      ) : (
        <Toastbar
          showSnack={true}
          text={"Please select District and Hospital Type."}
          variant="info"
        />
      )}
    </div>
  );
};

export default Main;
