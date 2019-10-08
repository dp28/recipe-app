import React from "react";
import { requestServings } from "../actions";
import { Extract } from "./Extract";

export function ExtractServings() {
  return (
    <Extract property="servings" requestBuilder={requestServings}>
      {servings => servings}
    </Extract>
  );
}
