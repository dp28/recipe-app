import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { NavBar } from "./NavBar";
import { DocumentTitle } from "./DocumentTitle";
import { appName } from "../config";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <DocumentTitle title={appName} />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Look, Material!</Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
