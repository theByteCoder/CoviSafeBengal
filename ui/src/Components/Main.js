import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MapsController from "./MapsController";
import NotFound from "./NotFound";

import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  parent: {
    background: "#333",
    marginTop: theme.spacing(10),
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
        <NotFound text={"Please select District and Hospital Type"} />
      )}
    </div>
  );
};

export default Main;
