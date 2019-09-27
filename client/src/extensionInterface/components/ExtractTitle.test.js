import React from "react";
import { ExtractTitle } from "./ExtractTitle";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ExtractTitle />);
  renderer.getRenderOutput();
});
