import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  addressText: {
    width: "100%",
    height: "100vh",
    top: 200,
    color: "rgba(255, 255, 255, 0.7)",
  },
});

const NotFound = ({ text }) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.addressText}
      variant="body2"
      color="textPrimary"
      component="p"
    >
      {text}
    </Typography>
  );
};

export default NotFound;
