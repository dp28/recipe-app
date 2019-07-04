import { parseIngredient } from "../domain/parseIngredient";

describe("parseIngredient", () => {
  it("should return the input as a rawText property", () => {
    const rawText = "10g sugar";
    expect(parseIngredient(rawText).rawText).toEqual(rawText);
  });

  it("should return any number in the input as the measurement amount", () => {
    const rawText = "10g sugar";
    expect(parseIngredient(rawText).measurement.amount).toEqual(10);
  });

  it("should return any characters after numbers in the input as the unit symbol", () => {
    const rawText = "10g sugar";
    expect(parseIngredient(rawText).measurement.unit.symbol).toEqual("g");
  });

  it("should return any other text as the food", () => {
    const rawText = "10g sugar";
    expect(parseIngredient(rawText).food.name).toEqual("sugar");
  });

  describe("if there are no units", () => {
    it("should set the unit to null", () => {
      expect(parseIngredient("1 onion").measurement.unit).toEqual(null);
    });
  });

  describe("if there are no numbers", () => {
    it("should set the measurement to null", () => {
      expect(parseIngredient("olive oil").measurement).toEqual(null);
    });

    it("should set the food to the input", () => {
      expect(parseIngredient("olive oil").food.name).toEqual("olive oil");
    });
  });
});
