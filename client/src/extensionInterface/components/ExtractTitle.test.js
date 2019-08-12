import React from "react";
import {
  UnconnectedExtractTitle,
  mapStateToProps,
  mapDispatchToProps
} from "./ExtractTitle";
import * as actions from "../actions";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <UnconnectedExtractTitle
      title="test"
      waitingForTitle={false}
      requestTitle={() => {}}
    />
  );
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the current recipe title from the state", () => {
    const recipe = { title: "fake" };
    expect(mapStateToProps({ recipe, browserExtension: {} }).title).toEqual(
      "fake"
    );
  });

  it("returns waitingForTitle as true if the state is waiting for the title", () => {
    expect(
      mapStateToProps({ recipe: {}, browserExtension: { waitingFor: "title" } })
        .waitingForTitle
    ).toEqual(true);
  });

  it("returns waitingForTitle as false if the state is not waiting for the title", () => {
    expect(
      mapStateToProps({ recipe: {}, browserExtension: { waitingFor: null } })
        .waitingForTitle
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
});
