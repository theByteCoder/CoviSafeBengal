import React, { useState } from "react";
import Directions from "./Directions";

const DirectionController = ({
  isOpen,
  handleGetDirections,
  destLoc,
  currLoc,
}) => {
  return (
    <div>
      {isOpen && (
        <Directions
          content={
            <>
              <b>Design your Popup</b>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <button>Test button</button>
            </>
          }
          handleClose={() => {
            handleGetDirections(false);
          }}
          currLoc={currLoc}
          destLoc={destLoc}
        />
      )}
    </div>
  );
};

export default DirectionController;
