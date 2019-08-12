import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import * as actions from "../actions";
import { Help } from "./Help";

export function UnconnectedExtractServings({
  servings,
  requestServings,
  waitingForServings
}) {
  if (waitingForServings) {
    return <Help>Click on the recipe servings</Help>;
  }
  if (servings) {
    return (
      <div>
        Servings: {servings}
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
    servings: state.recipe.servings,
    waitingForServings: state.browserExtension.waitingFor === "servings"
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    requestServings: () => dispatch(actions.requestServings())
  };
}

export const ExtractServings = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedExtractServings);
