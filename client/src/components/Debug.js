import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { requestApiMetadata } from "../actions";

const useStyles = makeStyles(theme => ({
  infoContainer: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary
  }
}));

export function UnconnectedDebug({ apiMetadata, dispatchRequestApiMetadata }) {
  const classes = useStyles();

  return (
    <Paper className={classes.infoContainer}>
      API version: {apiMetadata.version}
      <IconButton onClick={dispatchRequestApiMetadata}>
        <RefreshIcon />
      </IconButton>
    </Paper>
  );
}

export function mapStateToProps(state) {
  return {
    apiMetadata: state.meta.api
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestApiMetadata: () => dispatch(requestApiMetadata())
  };
}

export const Debug = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedDebug);
