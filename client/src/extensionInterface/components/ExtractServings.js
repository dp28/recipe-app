import React from "react";
import { connect } from "react-redux";
import { Servings } from "../../components/Servings";
import { requestServings } from "../actions";
import { Extract } from "./Extract";

export function UnconnectedExtractServings({ scaledServings }) {
  return (
    <Extract property="servings" requestBuilder={requestServings}>
      {servings => <Servings servings={scaledServings || servings} />}
    </Extract>
  );
}

export function mapStateToProps(state) {
  return {
    scaledServings: state.recipe.scaledServings
  };
}

export const ExtractServings = connect(mapStateToProps)(
  UnconnectedExtractServings
);
