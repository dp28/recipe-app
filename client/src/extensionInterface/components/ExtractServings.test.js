import React from "react";
import {
  UnconnectedExtractServings,
  mapStateToProps,
  mapDispatchToProps
} from "./ExtractServings";
import { requestServings } from "../actions";
import { scaleByServings } from "../../actions";
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

  describe("if scaledServings is set", () => {
    it("returns scaledServings instead of servings", () => {
      const recipe = { servings: 4, scaledServings: 6 };
      expect(
        mapStateToProps({ recipe, browserExtension: {} }).servings
      ).toEqual(6);
    });
  });
});

describe("mapDispatchToProps", () => {
  it("should return a requestServings action handler", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).requestServings();
    expect(dispatch).toHaveBeenCalledWith(requestServings());
  });

  it("should return a scaleByServings action handler that uses an event target", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).scaleByServings({ target: { value: 3 } });
    expect(dispatch).toHaveBeenCalledWith(scaleByServings(3));
  });
});
