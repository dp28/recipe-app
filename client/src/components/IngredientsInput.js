import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { updateIngredients } from "../actions";

const useStyles = makeStyles(theme => ({
  input: {
    width: "100%"
  }
}));

export function UnconnectedIngredientsInput({ dispatchUpdateIngredients }) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      multiline={true}
      type="text"
      onChange={event =>
        dispatchUpdateIngredients({ ingredients: event.target.value })
      }
      placeholder="Paste in ingredients from multiple recipes"
    />
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateIngredients: ({ ingredients }) =>
      dispatch(updateIngredients({ ingredients }))
  };
}

export const IngredientsInput = connect(
  null,
  mapDispatchToProps
)(UnconnectedIngredientsInput);
