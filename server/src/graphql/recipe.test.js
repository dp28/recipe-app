const { createTestClient } = require("apollo-server-testing");
const { server } = require("./graphqlServer");
const { recipeImported } = require("../domain/events");
const { saveEvent, deleteAllEvents } = require("../storage/mongo");

const { query: executeQuery } = createTestClient(server);

describe("recipes", () => {
  describe("when no recipes are saved", () => {
    it("should return an empty array", async () => {
      const query = "{ recipes { id } }";
      const response = await executeQuery({ query });
      expect(response.data.recipes.length).toEqual(0);
    });
  });

  describe("when a RECIPE_IMPORTED event has occurred", () => {
    const recipe = {
      id: "fake_id",
      title: "Toast",
      url: "https://www.example.com/toast",
      servings: 1,
      ingredients: [
        {
          id: "another_id",
          rawText:
            "1 large slice of bread (wholemeal or white), crusts removed",
          food: { name: "bread" },
          measurement: {
            amount: 1,
            unit: { name: "slice" },
            size: "large"
          },
          instruction: "crusts removed",
          notes: "wholemeal or white"
        }
      ],
      method: {
        id: "fakety_fake",
        steps: [
          {
            id: "fake_fake_fake",
            ordering: 1,
            rawText: "Put the bread in the toaster for 2 minutes",
            ingredientIds: ["another_id"],
            timers: [{ unit: "minute", amount: 2 }]
          }
        ]
      }
    };

    const event = recipeImported(recipe);

    beforeEach(() => saveEvent(event));
    afterEach(deleteAllEvents);

    async function requestRecipe(recipeQuery) {
      const response = await executeQuery({
        query: `{ recipes ${recipeQuery} }`
      });
      return response.data.recipes[0];
    }

    it("should return a single result", async () => {
      const query = "{ recipes { id } }";
      const response = await executeQuery({ query });
      return expect(response.data.recipes.length).toEqual(1);
    });

    ["id", "title", "url", "servings"].forEach(property => {
      it(`should have the correct ${property}`, async () => {
        const result = await requestRecipe(`{ ${property} }`);
        return expect(result[property]).toEqual(recipe[property]);
      });
    });

    it("should have the correct number of ingredients", async () => {
      const result = await requestRecipe(`{ ingredients { id } }`);
      return expect(result.ingredients.length).toEqual(
        recipe.ingredients.length
      );
    });

    describe("each ingredient", () => {
      const ingredient = recipe.ingredients[0];

      async function requestIngredient(ingredientQuery) {
        const result = await requestRecipe(
          `{ ingredients ${ingredientQuery} }`
        );
        return result.ingredients[0];
      }

      ["id", "rawText", "instruction", "notes"].forEach(property => {
        it(`should have the correct ${property}`, async () => {
          const result = await requestIngredient(`{ ${property} }`);
          return expect(result[property]).toEqual(ingredient[property]);
        });
      });

      it("should have the correct food", async () => {
        const result = await requestIngredient("{ food { name } }");
        return expect(result.food).toEqual(ingredient.food);
      });

      it("should have the correct measurement", async () => {
        const result = await requestIngredient(`{
          measurement {
            amount
            size
            unit {
              name
            }
          }
        }`);
        return expect(result.measurement).toEqual(ingredient.measurement);
      });
    });

    it("should have the correct method id", async () => {
      const result = await requestRecipe(`{ method { id } }`);
      return expect(result.method.id).toEqual(recipe.method.id);
    });

    it("should have the correct number of steps", async () => {
      const result = await requestRecipe(`{ method { steps { id } } }`);
      return expect(result.method.steps.length).toEqual(
        recipe.method.steps.length
      );
    });
    describe("each step", () => {
      const step = recipe.method.steps[0];

      async function requestStep(ingredientQuery) {
        const result = await requestRecipe(
          `{ method { steps ${ingredientQuery} } }`
        );
        return result.method.steps[0];
      }

      ["id", "rawText", "ordering", "ingredientIds"].forEach(property => {
        it(`should have the correct ${property}`, async () => {
          const result = await requestStep(`{ ${property} }`);
          return expect(result[property]).toEqual(step[property]);
        });
      });

      it("should have the correct timers", async () => {
        const result = await requestStep(`{ timers { amount unit } }`);
        return expect(result.timers).toEqual(step.timers);
      });
    });
  });
});