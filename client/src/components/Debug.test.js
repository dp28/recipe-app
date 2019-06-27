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
      <Debug
        apiMetadata={{ version: "some_version" }}
        requestApiMetadata={() => {}}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("mapStateToProps", () => {
  it("extracts the api metadata from the meta state", () => {
    const apiMetadata = {
      version: "fake_version",
      deployedAt: new Date().toISOString(),
      environment: "fake"
    };
    const state = { meta: { api: apiMetadata } };
    expect(mapStateToProps(state).apiMetadata).toEqual(apiMetadata);
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
