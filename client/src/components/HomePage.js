import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Loading } from "./Loading";
import { Page } from "./Page";

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
    <Page>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1>Recipes</h1>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Loading waitFor="recipes">
          {recipes.map(recipe => (
            <Paper key={recipe.id} className={classes.paper}>
              <Link to={`/recipes/${recipe.id}/cook`}>{recipe.title}</Link>
            </Paper>
          ))}
        </Loading>
      </Grid>
    </Page>
  );
}

export function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export const HomePage = connect(mapStateToProps)(UnconnectedHomePage);
