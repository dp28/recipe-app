import React from "react";
import ReactDOM from "react-dom";
import {
  UnconnectedDebug as Debug,
  mapStateToProps,
  mapDispatchToProps
} from "./Debug";
import { requestApiMetadata } from "../actions";

describe("Debug", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Debug apiVersion={"some_version"} requestApiMetadata={() => {}} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("mapStateToProps", () => {
  it("extracts the apiVersion from the meta state", () => {
    const apiVersion = "fake_version";
    const state = { meta: { apiVersion } };
    expect(mapStateToProps(state).apiVersion).toEqual(apiVersion);
  });
});

describe("mapDispatchToProps", () => {
  it("exposes a function to dispatch requestApiMetadata", () => {
    let result = null;
    const dispatch = action => {
      result = action;
    };
    mapDispatchToProps(dispatch).dispatchRequestApiMetadata();
    expect(result).toEqual(requestApiMetadata());
  });
});
