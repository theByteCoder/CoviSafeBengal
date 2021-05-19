import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  popupBox: {
    position: "fixed",
    background: "#00000050",
    width: "100%",
    height: "100vh",
    top: 0,
    left: 0,
  },
  box: {
    top: 50,
    position: "relative",
    width: "40%",
    height: "15%",
    margin: "0 auto",
    marginTop: "calc(100vh - 85vh - 20px)",
    background: "#fff",
    borderRadius: "4px",
    padding: "20px",
    border: "1px solid #999",
    overflow: "hidden",
  },
  closeIcon: {
    content: "x",
    cursor: "pointer",
    position: "fixed",
    right: "calc(30% - 30px)",
    background: "#ededed",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    lineHeight: "20px",
    textAlign: "center",
    border: "1px solid #999",
    fontSize: "20px",
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
        {address.length && (
          <Typography variant="body2" color="textSecondary" component="p">
            {address}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Address;
