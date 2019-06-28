import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import { requestApiMetadata } from "../actions";
import { apiURL, environment as clientEnvironment } from "../config";

const useStyles = makeStyles(theme => ({
  infoContainer: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary
  },
  table: {
    tableLayout: "auto",
    width: "auto",
    overflowX: "auto"
  },
  server: {
    overflowX: "auto"
  }
}));

export function UnconnectedDebug({ apiMetadata, dispatchRequestApiMetadata }) {
  const classes = useStyles();

  return (
    <Paper className={classes.infoContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Client</Typography>
          <Table className={classes.table}>
            <TableBody>
              <EnvironmentRow environment={clientEnvironment} />
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12} sm={6} className={classes.server}>
          <Typography variant="h5">
            Server
            <IconButton onClick={dispatchRequestApiMetadata}>
              <RefreshIcon />
            </IconButton>
          </Typography>

          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>
                  <Link href={apiURL}>{apiURL}</Link>
                </TableCell>
              </TableRow>

              {apiMetadata.error ? (
                <ApiError error={apiMetadata.error} />
              ) : (
                <ApiMetadata {...apiMetadata} />
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
}

const useRowStyles = makeStyles(theme => ({
  production: {
    backgroundColor: red[200]
  },
  development: {
    backgroundColor: blue[200]
  },
  local: {
    backgroundColor: green[200]
  }
}));

function EnvironmentRow({ environment }) {
  const classes = useRowStyles();
  const environmentClass = environment && classes[environment.toLowerCase()];
  return (
    <TableRow>
      <TableCell>Environment</TableCell>
      <TableCell className={environmentClass}>{environment}</TableCell>
    </TableRow>
  );
}

function VersionRow({ version }) {
  return (
    <TableRow>
      <TableCell>Version</TableCell>
      <TableCell>
        {version && (
          <Link href={`https://github.com/dp28/recipe-app/commit/${version}`}>
            {version.substring(0, 6)}
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
}

function ApiError({ error }) {
  return (
    <TableRow key="error">
      <TableCell>Error</TableCell>
      <TableCell>{error.toString()}</TableCell>
    </TableRow>
  );
}

function ApiMetadata({ version, environment, deployedAt }) {
  return [
    <EnvironmentRow environment={environment} key="environment" />,

    <TableRow key="deployedAt">
      <TableCell>Deployed At</TableCell>
      <TableCell>{deployedAt && deployedAt.toISOString()}</TableCell>
    </TableRow>,

    <VersionRow version={version} key="version" />
  ];
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
