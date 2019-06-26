import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { requestVersion } from "../actions";

const useStyles = makeStyles(theme => ({
  infoContainer: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary
  }
}));

export function UnconnectedDebug({ apiVersion, dispatchRequestVersion }) {
  const classes = useStyles();

  return (
    <Paper className={classes.infoContainer}>
      API version: {apiVersion}
      <IconButton onClick={dispatchRequestVersion}>
        <RefreshIcon />
      </IconButton>
    </Paper>
  );
}

export function mapStateToProps(state) {
  return {
    apiVersion: state.meta.apiVersion
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestVersion: () => dispatch(requestVersion())
  };
}

export const Debug = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedDebug);
