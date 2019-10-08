import React from "react";
import { ExtractServings } from "./ExtractServings";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ExtractServings scaledServings={3} />);
  renderer.getRenderOutput();
});
