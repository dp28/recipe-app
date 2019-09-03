import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { appName } from "../config";
import { DebugPopover } from "./DebugPopover";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  titleLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none"
  }
}));

export function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.titleLink} to="/">
              {appName}
            </Link>
          </Typography>
          <DebugPopover />
        </Toolbar>
      </AppBar>
    </div>
  );
}
