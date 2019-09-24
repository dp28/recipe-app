import React from "react";
import { connect } from "react-redux";
import Input from "@material-ui/core/Input";
import { scaleByServings as unconnectedScaleByServings } from "../actions";

export function UnconnectedServings({ servings, scaleByServings }) {
  return (
    <div>
      Servings:{" "}
      <Input type="number" value={servings} onChange={scaleByServings} />
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    servings: state.recipe.scaledServings || state.recipe.servings,
    waitingForServings: state.browserExtension.waitingFor === "servings"
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    scaleByServings: ({ target }) =>
      dispatch(unconnectedScaleByServings(target.value))
  };
}

export const Servings = connect(
  null,
  mapDispatchToProps
)(UnconnectedServings);
