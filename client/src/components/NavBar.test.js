import React from "react";
import { NavBar } from "./NavBar";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<NavBar />);
  renderer.getRenderOutput();
});
