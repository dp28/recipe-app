import React from "react";
import {
  UnconnectedExtract,
  mapStateToProps,
  mapDispatchToProps
} from "./Extract";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedExtract recipe={{}} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the passed-in property from the state", () => {
    const recipe = { ingredients: [{ text: "fake" }] };
    expect(
      mapStateToProps(
        { recipe, browserExtension: {} },
        { property: "ingredients" }
      ).value
    ).toEqual(recipe.ingredients);
  });

  it("returns waiting as true if the state is waiting for the property", () => {
    expect(
      mapStateToProps(
        {
          recipe: {},
          browserExtension: { currentStep: "ingredients", waiting: true }
        },
        { property: "ingredients" }
      ).waiting
    ).toEqual(true);
  });

  it("returns waiting as false if the state is not waiting for the property", () => {
    expect(
      mapStateToProps(
        {
          recipe: {},
          browserExtension: { currentStep: "ingredients", waiting: false }
        },
        { property: "ingredients" }
      ).waiting
    ).toEqual(false);
  });

  describe("propertyName", () => {
    it("sets propertyName to property if propertyName is not set", () => {
      expect(
        mapStateToProps(
          { recipe: {}, browserExtension: {} },
          { property: "fake" }
        ).propertyName
      ).toEqual("fake");
    });
    it("doesn't change the propertyName if it is already set", () => {
      expect(
        mapStateToProps(
          { recipe: {}, browserExtension: {} },
          { property: "fake", propertyName: "better" }
        ).propertyName
      ).toEqual("better");
    });
  });
});

describe("mapDispatchToProps", () => {
  it("should return a dispatchRequest handler built from the requestBuilder", () => {
    const dispatch = jest.fn();
    const requestBuilder = () => "fake";
    const { dispatchRequest } = mapDispatchToProps(dispatch, {
      requestBuilder
    });
    dispatchRequest();
    expect(dispatch).toHaveBeenCalledWith(requestBuilder());
  });
});
