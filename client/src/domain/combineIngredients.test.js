import { combineIngredientsIfPossible } from "./combineIngredients";

describe("combineIngredientsIfPossible", () => {
  describe("if the ingredients have different food and different units", () => {
    it("should return null", () => {
      const ingredients = [
        { food: { name: "sugar" }, measurement: { unit: { symbol: "g" } } },
        { food: { name: "flour" }, measurement: { unit: { symbol: "oz" } } }
      ];
      expect(combineIngredientsIfPossible(ingredients)).toEqual(null);
    });
  });

  describe("if the ingredients have different food but the same units", () => {
    it("should return null", () => {
      const ingredients = [
        { food: { name: "sugar" }, measurement: { unit: { symbol: "g" } } },
        {
          food: { name: "brown flour" },
          measurement: { unit: { symbol: "g" } }
        }
      ];
      expect(combineIngredientsIfPossible(ingredients)).toEqual(null);
    });

    describe("if ignoreFood is true", () => {
      it("should return the ingredients added together into a single unit, using the first food", () => {
        const ingredients = [
          {
            food: { name: "sugar" },
            measurement: { amount: 10, unit: { symbol: "g" } }
          },
          {
            food: { name: "brown sugar" },
            measurement: { amount: 20, unit: { symbol: "g" } }
          }
        ];
        expect(
          combineIngredientsIfPossible(ingredients, { ignoreFood: true })
        ).toEqual({
          food: { name: "sugar" },
          measurement: { amount: 30, unit: { symbol: "g" } }
        });
      });
    });
  });

  describe("if the ingredients have the same food", () => {
    const food = { name: "sugar" };

    describe("and there are no measurements", () => {
      it("should return a single copy", () => {
        expect(combineIngredientsIfPossible([{ food }, { food }])).toEqual({
          food
        });
      });
    });

    describe("and they have measurements with different units", () => {
      it("should return null", () => {
        const ingredients = [
          { food, measurement: { unit: { symbol: "g" } } },
          { food, measurement: { unit: { symbol: "oz" } } }
        ];

        expect(combineIngredientsIfPossible(ingredients)).toEqual(null);
      });
    });

    describe("and one has a measurement and one does not", () => {
      it("should return null", () => {
        const ingredients = [
          { food },
          { food, measurement: { unit: { symbol: "oz" } } }
        ];

        expect(combineIngredientsIfPossible(ingredients)).toEqual(null);
      });
    });

    describe("and they have measurements with the same units", () => {
      it("should return the ingredients added together into a single unit", () => {
        const ingredients = [
          { food, measurement: { amount: 10, unit: { symbol: "g" } } },
          { food, measurement: { amount: 20, unit: { symbol: "g" } } }
        ];
        expect(combineIngredientsIfPossible(ingredients)).toEqual({
          food,
          measurement: { amount: 30, unit: { symbol: "g" } }
        });
      });
    });
  });
});
