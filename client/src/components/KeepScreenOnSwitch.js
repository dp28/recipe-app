import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NoSleep from "nosleep.js";

const noSleep = new NoSleep();

export function KeepScreenOnSwitch() {
  const [screenAlwaysOn, setScreenAlwaysOn] = useState(false);

  const toggleSleep = () => {
    if (screenAlwaysOn) {
      noSleep.disable();
      setScreenAlwaysOn(false);
    } else {
      noSleep.enable();
      setScreenAlwaysOn(true);
    }
  };

  return (
    <FormControlLabel
      label="Keep screen on"
      control={<Switch onChange={toggleSleep} checked={screenAlwaysOn} />}
    />
  );
}
