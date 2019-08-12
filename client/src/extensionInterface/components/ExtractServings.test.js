import React from "react";
import {
  UnconnectedExtractServings,
  mapStateToProps,
  mapDispatchToProps
} from "./ExtractServings";
import * as actions from "../actions";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <UnconnectedExtractServings
      servings={3}
      waitingForServings={false}
      requestServings={() => {}}
    />
  );
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the current recipe servings from the state", () => {
    const recipe = { servings: 4 };
    expect(mapStateToProps({ recipe, browserExtension: {} }).servings).toEqual(
      recipe.servings
    );
  });

  it("returns waitingForServings as true if the state is waiting for the servings", () => {
    expect(
      mapStateToProps({
        recipe: {},
        browserExtension: { waitingFor: "servings" }
      }).waitingForServings
    ).toEqual(true);
  });

  it("returns waitingForServings as false if the state is not waiting for the servings", () => {
    expect(
      mapStateToProps({ recipe: {}, browserExtension: { waitingFor: null } })
        .waitingForServings
    ).toEqual(false);
  });
});

describe("mapDispatchToProps", () => {
  it("should return a requestServings action handler", () => {
    const dispatch = jest.fn();
    const { requestServings } = mapDispatchToProps(dispatch);
    requestServings();
    expect(dispatch).toHaveBeenCalledWith(actions.requestServings());
  });
});
