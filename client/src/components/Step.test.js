import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Step } from "./Step";

describe("Step", () => {
  it("renders without crashing", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Step step={{}} />);
    renderer.getRenderOutput();
  });
});
