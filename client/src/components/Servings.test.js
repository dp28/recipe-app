import React from "react";
import { UnconnectedServings, mapDispatchToProps } from "./Servings";
import { scaleByServings } from "../actions";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <UnconnectedServings servings={3} requestServings={() => {}} />
  );
  renderer.getRenderOutput();
});

describe("mapDispatchToProps", () => {
  it("should return a scaleByServings action handler that uses an event target", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).scaleByServings({ target: { value: 3 } });
    expect(dispatch).toHaveBeenCalledWith(scaleByServings(3));
  });
});
