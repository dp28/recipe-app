import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import indigo from "@material-ui/core/colors/indigo";
import { useInterval } from "../effects/useInterval";

const useStyles = makeStyles(theme => ({
  timer: {
    display: "flex",
    flexGrow: 1,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  time: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    alignSelf: "center"
  },
  timePart: {
    cursor: "default",
    marginRight: theme.spacing(0.25)
  },
  slider: {
    color: props => props.colour,
    flexGrow: 1,
    display: "flex",
    alignSelf: "center",
    direction: "rtl"
  }
}));

export function Timer({ timer, flashLengthInMillis = 300 }) {
  const [secondsRemaining, setSecondsRemaining] = useState(timer.seconds);
  const [running, setRunning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const showHours = timer.seconds >= 60 * 60;
  const finished = secondsRemaining <= 0;
  const positiveSecondsRemaining = Math.max(0, secondsRemaining);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  const colour = calculateColour({
    secondsRemaining,
    totalSeconds: timer.seconds,
    flashOn,
    running,
    finished
  });

  const classes = useStyles({ colour });

  useInterval(
    () => {
      setSecondsRemaining(seconds => seconds - 1);
    },
    running && !finished ? 1000 : null
  );

  useInterval(
    () => {
      setFlashOn(currentFlashOn => !currentFlashOn);
    },
    running && finished ? flashLengthInMillis : null
  );

  const [hours, minutes, seconds] = calculateTimeParts(
    positiveSecondsRemaining
  );

  return (
    <div className={classes.timer}>
      {running ? <PauseButton pause={pause} /> : <StartButton start={start} />}
      <span className={classes.time}>
        {showHours && (
          <span className={classes.timePart}>
            <TimePart value={hours} colour={colour} />:
          </span>
        )}
        <span className={classes.timePart}>
          <TimePart value={minutes} colour={colour} />:
        </span>
        <span className={classes.timePart}>
          <TimePart value={seconds} colour={colour} />
        </span>
      </span>
      <Slider
        value={positiveSecondsRemaining}
        min={0}
        max={Math.round(timer.seconds * 1.25)}
        className={classes.slider}
        onChange={(event, value) => setSecondsRemaining(Number(value))}
      />
    </div>
  );
}

function calculateTimeParts(totalSeconds) {
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return [hours, minutes, seconds];
}

function calculateColour({
  secondsRemaining,
  totalSeconds,
  flashOn,
  running,
  finished
}) {
  if (!running) {
    return grey[300];
  }
  if (finished) {
    return flashOn ? red[300] : red[100];
  }
  if (secondsRemaining < Math.min(30, totalSeconds / 4)) {
    return amber[200];
  }
  return indigo[300];
}

function StartButton({ start }) {
  return (
    <IconButton size="small" onClick={start}>
      <PlayArrowIcon />
    </IconButton>
  );
}

function PauseButton({ pause }) {
  return (
    <IconButton size="small" onClick={pause}>
      <PauseIcon />
    </IconButton>
  );
}

const useTimePartStyles = makeStyles(theme => {
  return {
    digit: {
      marginRight: theme.spacing(0.25),
      padding: theme.spacing(0.5),
      backgroundColor: props => props.colour,
      color: props => theme.palette.getContrastText(props.colour),
      borderRadius: theme.spacing(0.25)
    }
  };
});

function TimePart({ value, colour }) {
  const classes = useTimePartStyles({ colour });
  const [first, second] = zeroPad(value).split("");
  return [
    <span key="first" className={classes.digit}>
      {first}
    </span>,
    <span key="second" className={classes.digit}>
      {second}
    </span>
  ];
}

function zeroPad(number) {
  return String(number).padStart(2, "0");
}
