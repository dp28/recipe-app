import React from "react";
import ReactDOM from "react-dom";
import {
  UnconnectedIngredientsInput as IngredientsInput,
  mapDispatchToProps
} from "./IngredientsInput";
import { updateIngredients } from "../actions";

describe("IngredientsInput", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<IngredientsInput updateIngredients={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("mapDispatchToProps", () => {
  it("exposes a function to dispatch updateIngredients", () => {
    let result = null;
    const dispatch = action => {
      result = action;
    };
    const ingredients = "10g potatoes\n1 egg";
    mapDispatchToProps(dispatch).dispatchUpdateIngredients({ ingredients });
    expect(result).toEqual(updateIngredients({ ingredients }));
  });
});
