import React, { useEffect, useState } from "react";
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
    maxWidth: "60%",
    maxHeight: "90%",
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
  contactText: {
    marginBottom: 10,
    textAlign: "center",
    color: "white",
    textDecoration: "none",
  },
  noInfoText: {
    color: "white",
  },
});

const Contact = ({ handleClose, contact }) => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // here format can be, tel:<number>/<number>
    const initial = contact.replace("tel:", "").replace(" ", "");
    if (initial.includes("/")) {
      const lists = initial.split("/");
      setContacts(lists);
    } else if (initial.includes(",")) {
      const lists = initial.split(",");
      setContacts(lists);
    } else {
      setContacts([initial]);
    }
  }, [contact]);

  const handleClick = (item) => {
    window.open(item, "_blank");
  };

  return (
    <div className={classes.popupBox}>
      <div className={classes.box}>
        <CancelIcon
          data-test={"hook-close-button"}
          className={classes.closeIcon}
          color="secondary"
          onClick={handleClose}
        />
        {contacts.length ? (
          contacts.map((item, key) => {
            return (
              <Typography
                data-test={"hook-contact-text"}
                className={classes.contactText}
                variant="body2"
                color="textPrimary"
                component="p"
                key={key}
                onClick={() => {
                  handleClick(`tel:${item}`);
                }}
              >
                {item}
              </Typography>
            );
          })
        ) : (
          <Typography
            data-test={"hook-contact-text"}
            className={classes.noInfoText}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            Contact details unavailable.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Contact;
