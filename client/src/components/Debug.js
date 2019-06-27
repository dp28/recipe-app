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
import { requestApiMetadata } from "../actions";
import { apiURL, environment as clientEnvironment } from "../config";

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
      <Typography variant="h5">Client</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Environment</TableCell>
            <TableCell>{clientEnvironment}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Typography variant="h5">
        Server
        <IconButton onClick={dispatchRequestApiMetadata}>
          <RefreshIcon />
        </IconButton>
      </Typography>

      <Table>
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
    </Paper>
  );
}

function ApiError({ error }) {
  return (
    <TableRow key="error">
      <TableCell>Error</TableCell>
      <TableCell>{error}</TableCell>
    </TableRow>
  );
}

function ApiMetadata({ version, environment, deployedAt }) {
  return [
    <TableRow key="environment">
      <TableCell>Environment</TableCell>
      <TableCell>{environment}</TableCell>
    </TableRow>,

    <TableRow key="deployedAt">
      <TableCell>Deployed At</TableCell>
      <TableCell>{deployedAt && deployedAt.toISOString()}</TableCell>
    </TableRow>,

    <TableRow key="version">
      <TableCell>Version</TableCell>
      <TableCell>
        {version && (
          <Link href={`https://github.com/dp28/recipe-app/commit/${version}`}>
            {version}
          </Link>
        )}
      </TableCell>
    </TableRow>
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
