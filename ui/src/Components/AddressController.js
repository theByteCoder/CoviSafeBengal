import React from "react";
import Address from "./Address";

const AddressController = ({ isOpen, handleGetAddress, address }) => {
  return (
    <div>
      {isOpen && (
        <Address
          handleClose={() => {
            handleGetAddress(false);
          }}
          address={address}
        />
      )}
    </div>
  );
};

export default AddressController;
