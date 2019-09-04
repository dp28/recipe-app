import React from "react";
import ReactDOM from "react-dom";
import { Step } from "./Step";

describe("Step", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Step step={{}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
