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

  it("returns waitingForTitle as true if the state is waiting for the title", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: "title" } })
        .waitingForTitle
    ).toEqual(true);
  });

  it("returns waitingForTitle as false if the state is not waiting for the title", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: null } })
        .waitingForTitle
    ).toEqual(false);
  });

  it("returns waitingForServings as true if the state is waiting for the servings", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: "servings" } })
        .waitingForServings
    ).toEqual(true);
  });

  it("returns waitingForServings as false if the state is not waiting for the servings", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: null } })
        .waitingForServings
    ).toEqual(false);
  });

  it("returns waitingForIngredients as true if the state is waiting for the ingredients", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: "ingredients" } })
        .waitingForIngredients
    ).toEqual(true);
  });

  it("returns waitingForIngredients as false if the state is not waiting for the ingredients", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: null } })
        .waitingForIngredients
    ).toEqual(false);
  });

  it("returns waitingForMethod as true if the state is waiting for the method", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: "method" } })
        .waitingForMethod
    ).toEqual(true);
  });

  it("returns waitingForMethod as false if the state is not waiting for the method", () => {
    expect(
      mapStateToProps({ browserExtension: { waitingFor: null } })
        .waitingForMethod
    ).toEqual(false);
  });
});

describe("mapDispatchToProps", () => {
  it("should return a requestTitle action handler", () => {
    const dispatch = jest.fn();
    const { requestTitle } = mapDispatchToProps(dispatch);
    requestTitle();
    expect(dispatch).toHaveBeenCalledWith(actions.requestTitle());
  });

  it("should return a requestServings action handler", () => {
    const dispatch = jest.fn();
    const { requestServings } = mapDispatchToProps(dispatch);
    requestServings();
    expect(dispatch).toHaveBeenCalledWith(actions.requestServings());
  });

  it("should return a requestIngredients action handler", () => {
    const dispatch = jest.fn();
    const { requestIngredients } = mapDispatchToProps(dispatch);
    requestIngredients();
    expect(dispatch).toHaveBeenCalledWith(actions.requestIngredients());
  });

  it("should return a requestMethod action handler", () => {
    const dispatch = jest.fn();
    const { requestMethod } = mapDispatchToProps(dispatch);
    requestMethod();
    expect(dispatch).toHaveBeenCalledWith(actions.requestMethod());
  });
});
