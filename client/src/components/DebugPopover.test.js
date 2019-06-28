import React from "react";
import { DebugPopover } from "./DebugPopover";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<DebugPopover />);
  renderer.getRenderOutput();
});
