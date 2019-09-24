import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Servings } from "../../components/Servings";
import { requestServings as unconnectedRequestServings } from "../actions";
import { scaleByServings as unconnectedScaleByServings } from "../../actions";
import { Help } from "./Help";

export function UnconnectedExtractServings({
  servings,
  requestServings,
  waitingForServings,
  scaleByServings
}) {
  if (waitingForServings) {
    return <Help>Click on the recipe servings</Help>;
  }
  if (servings) {
    return (
      <div>
        <Servings servings={servings} />
        <Button onClick={requestServings}>Change servings</Button>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={requestServings}>Set servings</Button>
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
    requestServings: () => dispatch(unconnectedRequestServings()),
    scaleByServings: ({ target }) =>
      dispatch(unconnectedScaleByServings(target.value))
  };
}

export const ExtractServings = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedExtractServings);
