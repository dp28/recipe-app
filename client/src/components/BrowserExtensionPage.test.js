import React from "react";
import {
  UnconnectedBrowserExtensionPage,
  mapStateToProps
} from "./BrowserExtensionPage";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedBrowserExtensionPage recipe={{}} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the current recipe from the state", () => {
    const recipe = { url: "fake" };
    expect(mapStateToProps({ recipe }).recipe).toEqual(recipe);
  });
});
