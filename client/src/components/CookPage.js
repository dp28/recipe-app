import React from "react";
import { connect } from "react-redux";
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

export function UnconnectedCookPage({ recipe }) {
  const classes = useStyles();

  return (
    <Page title={recipe.title}>
      <Grid item xs={12}>
        <Loading metaKey="recipe">
          <Paper className={classes.paper}>
            <h1>{recipe.title}</h1>
          </Paper>
        </Loading>
      </Grid>
    </Page>
  );
}

export function mapStateToProps(state) {
  return { recipe: state.recipe };
}

export const CookPage = connect(mapStateToProps)(UnconnectedCookPage);
