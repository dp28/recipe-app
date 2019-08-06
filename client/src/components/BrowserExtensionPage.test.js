import React from "react";
import {
  UnconnectedBrowserExtensionPage,
  mapStateToProps,
  mapDispatchToProps
} from "./BrowserExtensionPage";
import * as actions from "../actions";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedBrowserExtensionPage recipe={{}} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the current recipe from the state", () => {
    const recipe = { url: "fake" };
    expect(mapStateToProps({ recipe, browserExtension: {} }).recipe).toEqual(
      recipe
    );
  });

  it("extracts waitingForTitle from the state", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingForTitle: true } })
        .waitingForTitle
    ).toEqual(true);
  });
});

describe("mapDispatchToProps", () => {
  it("should return a requestTitle action handler", () => {
    const dispatch = jest.fn();
    const { requestTitle } = mapDispatchToProps(dispatch);
    requestTitle();
    expect(dispatch).toHaveBeenCalledWith(actions.requestTitle());
  });
});
