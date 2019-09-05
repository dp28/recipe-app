import React from "react";
import { KeepScreenOnSwitch } from "./KeepScreenOnSwitch";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<KeepScreenOnSwitch />);
  renderer.getRenderOutput();
});
