import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";

const Prompt = () => {
  const history = useHistory();

  const [locationKeys, setLocationKeys] = useState([]);

  React.useEffect(() => {
    return history.block((location, action) => {
      if (action === "PUSH") {
        if (location.key !== undefined) setLocationKeys([location.key]);
      }
      if (action === "POP") {
        if (locationKeys.length === 1 && location.key === undefined) {
          console.log("back 1");
          return window.confirm("Navigate Back?");
        }
        if (locationKeys.length === 1 && locationKeys[0] === location.key) {
          console.log("forward 1");
          return true;
        }
        if (location.key !== undefined) {
          if (locationKeys[1] === location.key) {
            console.log("forward");
            setLocationKeys(([_, ...keys]) => keys);
            return true;
          } else {
            console.log("back");
            const res = window.confirm("Navigate Back?");
            if (res) {
              setLocationKeys((keys) => [location.key, ...keys]);
              return true;
            } else {
              return false;
            }
            // Handle back event
          }
        }
      }
    });
  }, [locationKeys]);

  return <></>;
};
