import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  popupBox: {
    position: "fixed",
    background: "#00000099",
    width: "100%",
    height: "100%",
    top: 40,
    left: 0,
  },
  box: {
    top: 60,
    position: "relative",
    maxWidth: "55%",
    maxHeight: "85%",
    margin: "0 auto",
    marginTop: "calc(100vh - 85vh - 20px)",
    backgroundColor: "rgba(128,0,0,0.85)",
    borderRadius: "4px",
    padding: "20px",
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
  addressText: {
    color: "white",
  },
});

const Address = ({ handleClose, address }) => {
  const classes = useStyles();

  return (
    <div className={classes.popupBox}>
      <div className={classes.box}>
        <CancelIcon
          className={classes.closeIcon}
          color="secondary"
          onClick={handleClose}
        />
        {address.length ? (
          <Typography
            className={classes.addressText}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {address}
          </Typography>
        ) : (
          <Typography
            className={classes.addressText}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            Address details unavailable.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Address;
