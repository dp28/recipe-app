import React from "react";
import { UnconnectedExtensionPage } from "./ExtensionPage";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <UnconnectedExtensionPage recipe={{}} completedSteps={new Set()} />
  );
  renderer.getRenderOutput();
});
