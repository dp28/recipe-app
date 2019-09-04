import React from "react";
import { UnconnectedLoading, mapStateToProps } from "./Loading";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedLoading />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("should return the meta state of the passed-in waitFor", () => {
    const state = { meta: { something: { loading: true } } };
    expect(mapStateToProps(state, { waitFor: "something" })).toEqual({
      loading: true
    });
  });
});
