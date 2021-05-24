import React from "react";
import Contact from "./Contact";

const ContactController = ({ isOpen, handleGetContact, contact }) => {
  return (
    <div>
      {isOpen && (
        <Contact
          handleClose={() => {
            handleGetContact(false);
          }}
          contact={contact}
        />
      )}
    </div>
  );
};

export default ContactController;
