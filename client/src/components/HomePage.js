import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { NavBar } from "./NavBar";
import { DocumentTitle } from "./DocumentTitle";
import { Loading } from "./Loading";
import { appName } from "../config";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export function UnconnectedHomePage({ recipes }) {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <DocumentTitle title={appName} />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1>Recipes</h1>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Loading metaKey="recipes">
              {recipes.map(recipe => (
                <Paper key={recipe.id} className={classes.paper}>
                  {recipe.title}
                </Paper>
              ))}
            </Loading>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export const HomePage = connect(mapStateToProps)(UnconnectedHomePage);
