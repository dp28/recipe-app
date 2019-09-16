import React from "react";
import { Timer } from "./Timer";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Timer timer={{ seconds: 2 }} />);
  renderer.getRenderOutput();
});
