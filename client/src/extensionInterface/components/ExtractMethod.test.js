import React from "react";
import {
  UnconnectedExtractMethod,
  mapStateToProps,
  mapDispatchToProps
} from "./ExtractMethod";
import * as actions from "../actions";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <UnconnectedExtractMethod
      method={undefined}
      waitingForMethod={true}
      requestMethod={() => {}}
    />
  );
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the current recipe method from the state", () => {
    const recipe = { method: { instructions: [{ text: "fake" }] } };
    expect(mapStateToProps({ recipe, browserExtension: {} }).method).toEqual(
      recipe.method
    );
  });

  it("returns waitingForMethod as true if the state is waiting for the method", () => {
    expect(
      mapStateToProps({
        recipe: {},
        browserExtension: { waitingFor: "method" }
      }).waitingForMethod
    ).toEqual(true);
  });

  it("returns waitingForMethod as false if the state is not waiting for the method", () => {
    expect(
      mapStateToProps({ recipe: {}, browserExtension: { waitingFor: null } })
        .waitingForMethod
    ).toEqual(false);
  });
});

describe("mapDispatchToProps", () => {
  it("should return a requestMethod action handler", () => {
    const dispatch = jest.fn();
    const { requestMethod } = mapDispatchToProps(dispatch);
    requestMethod();
    expect(dispatch).toHaveBeenCalledWith(actions.requestMethod());
  });
});
