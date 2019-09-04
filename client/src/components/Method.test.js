import React from "react";
import ReactDOM from "react-dom";
import { Method } from "./Method";

describe("Method", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Method method={{ steps: [] }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
