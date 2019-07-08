import React from "react";
import { BrowserExtensionPage } from "./BrowserExtensionPage";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<BrowserExtensionPage />);
  renderer.getRenderOutput();
});
