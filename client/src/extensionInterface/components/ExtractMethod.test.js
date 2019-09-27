import React from "react";
import { ExtractMethod } from "./ExtractMethod";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ExtractMethod />);
  renderer.getRenderOutput();
});
