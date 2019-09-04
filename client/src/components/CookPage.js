import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { preload } from "./PreloadPage";
import { DocumentTitle } from "./DocumentTitle";
import { Ingredient } from "./Ingredient";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export function UnconnectedCookPage({ recipe }) {
  const classes = useStyles();
  if (!recipe.id) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <DocumentTitle title={recipe.title} />
      <Paper className={classes.paper}>
        <h1>{recipe.title}</h1>

        <h2>Ingredients</h2>
        {recipe.ingredients.map(ingredient => (
          <Ingredient ingredient={ingredient} />
        ))}
      </Paper>
    </Grid>
  );
}

export function mapStateToProps(state) {
  return { recipe: state.recipe };
}

export const CookPage = preload(
  "recipe",
  connect(mapStateToProps)(UnconnectedCookPage)
);
