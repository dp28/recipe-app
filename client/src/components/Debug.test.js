import React from "react";
import ReactDOM from "react-dom";
import {
  UnconnectedDebug as Debug,
  mapStateToProps,
  mapDispatchToProps
} from "./Debug";
import { requestVersion } from "../actions";

describe("Debug", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Debug apiVersion={"some_version"} requestVersion={() => {}} />,
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
  it("exposes a function to dispatch requestVersion", () => {
    let result = null;
    const dispatch = action => {
      result = action;
    };
    mapDispatchToProps(dispatch).dispatchRequestVersion();
    expect(result).toEqual(requestVersion());
  });
});
