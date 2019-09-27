import React from "react";
import { ExtractIngredients } from "./ExtractIngredients";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ExtractIngredients />);
  renderer.getRenderOutput();
});
