import React from "react";
import { ShoppingListPage } from "./ShoppingListPage";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ShoppingListPage />);
  renderer.getRenderOutput();
});
