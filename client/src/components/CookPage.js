import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { preload } from "./PreloadPage";
import { DocumentTitle } from "./DocumentTitle";
import { IngredientList } from "./IngredientList";
import { Method } from "./Method";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center"
  }
}));

export function UnconnectedCookPage({ recipe }) {
  const classes = useStyles();
  if (!recipe.id) {
    return null;
  }

  return [
    <Grid item xs={12}>
      <DocumentTitle title={recipe.title} />
      <Paper className={classes.paper}>
        <h1>{recipe.title}</h1>
      </Paper>
    </Grid>,
    <Grid item xs={12} sm={4}>
      <IngredientList ingredients={recipe.ingredients} />
    </Grid>,
    <Grid item xs={12} sm={8}>
      <Method method={recipe.method} />
    </Grid>
  ];
}

export function mapStateToProps(state) {
  return { recipe: state.recipe };
}

export const CookPage = preload(
  "recipe",
  connect(mapStateToProps)(UnconnectedCookPage)
);
