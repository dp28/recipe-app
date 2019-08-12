import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Help } from "./Help";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Help>Test</Help>);
  renderer.getRenderOutput();
});
