import React from "react";
import ReactDOM from "react-dom";
import { IngredientList } from "./IngredientList";

describe("IngredientList", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<IngredientList ingredients={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
