import React from "react";
import ReactDOM from "react-dom";
import { Ingredient } from "./Ingredient";

describe("Ingredient", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Ingredient
        ingredient={{
          id: "fake_id",
          food: { name: "onion" },
          measurement: { amount: 1, size: "large" }
        }}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
