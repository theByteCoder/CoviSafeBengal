import React from "react";
import Directions from "./Directions";

const DirectionController = ({
  isOpen,
  handleGetDirections,
  destLoc,
  origin,
}) => {
  return (
    <div>
      {isOpen && (
        <Directions
          handleClose={() => {
            handleGetDirections(false);
          }}
          destLoc={destLoc}
          origin={origin}
        />
      )}
    </div>
  );
};

export default DirectionController;
