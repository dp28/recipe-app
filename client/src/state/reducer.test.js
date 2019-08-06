import { reducer } from "./reducer";
import {
  apiMetadataLoaded,
  errorLoadingApiMetadata,
  requestApiMetadata,
  updateIngredients,
  combineIngredients,
  addCategory,
  addToCategory,
  setRecipeUrl,
  requestTitle,
  setRecipeTitle,
  requestServings,
  setRecipeServings
} from "../actions";
import { parseIngredient } from "../domain/parseIngredient";

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty object", () => {
      expect(initialState).toEqual({
        meta: { api: { loading: true } },
        ingredients: [],
        categories: [],
        recipe: {},
        browserExtension: { waitingFor: null }
      });
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      expect(reducer(initialState, { type: "FAKE_ACTION" })).toBe(initialState);
    });
  });

  describe("with an apiMetadataLoaded action", () => {
    it("should set the API version", () => {
      const version = "fake_version";
      const newState = reducer(initialState, apiMetadataLoaded({ version }));
      expect(newState.meta.api.version).toEqual(version);
    });

    it("should set the API environment", () => {
      const environment = "fake_environment";
      const newState = reducer(
        initialState,
        apiMetadataLoaded({ environment })
      );
      expect(newState.meta.api.environment).toEqual(environment);
    });

    it("should set the API deployedAt time as a Date", () => {
      const deployedAtDate = new Date();
      const deployedAt = deployedAtDate.toISOString();
      const newState = reducer(initialState, apiMetadataLoaded({ deployedAt }));
      expect(newState.meta.api.deployedAt).toEqual(deployedAtDate);
    });

    it("should set loading to false", () => {
      const newState = reducer(initialState, apiMetadataLoaded({}));
      expect(newState.meta.api.loading).toBe(false);
    });
  });

  describe("with a requestApiMetadata action", () => {
    it("should set loading to true", () => {
      const state = reducer(initialState, apiMetadataLoaded({}));
      const newState = reducer(state, requestApiMetadata());
      expect(newState.meta.api.loading).toBe(true);
    });
  });

  describe("with an errorLoadingApiMetadata action", () => {
    it("should set the current API version", () => {
      const error = new Error();
      const newState = reducer(initialState, errorLoadingApiMetadata(error));
      expect(newState.meta.api.error).toEqual(error);
    });

    it("should set loading to false", () => {
      const newState = reducer(
        initialState,
        errorLoadingApiMetadata(new Error())
      );
      expect(newState.meta.api.loading).toBe(false);
    });
  });

  describe("with an updateIngredients action", () => {
    it("should pass each line to parseIngredient", () => {
      const ingredients = `
        10g sugar
        1 egg
      `;
      const state = reducer(initialState, updateIngredients({ ingredients }));
      expect(state.ingredients).toEqual(
        ingredients.split("\n").map(parseIngredient)
      );
    });
  });

  describe("with a combineIngredients action", () => {
    it("should replace the two ingredients with their combined result, ignoring the food", () => {
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
      const hasIngredients = { ...initialState, ingredients };
      const state = reducer(hasIngredients, combineIngredients(ingredients));
      expect(state.ingredients).toEqual([
        {
          food: { name: "sugar" },
          measurement: { amount: 30, unit: { symbol: "g" } }
        }
      ]);
    });
  });

  describe("with an addCategory action", () => {
    it("should add a new category", () => {
      const name = "Dairy";
      const state = reducer(initialState, addCategory({ name }));
      expect(state.categories).toEqual([{ name }]);
    });
  });

  describe("with an addToCategory action", () => {
    it("should add the categoryName to the ingredient", () => {
      const name = "Dairy";
      const ingredient = {
        food: { name: "sugar" },
        measurement: { amount: 30, unit: { symbol: "g" } }
      };
      const startState = {
        ...initialState,
        categories: [{ name }],
        ingredients: [ingredient]
      };
      const state = reducer(
        startState,
        addToCategory({ ingredient, categoryName: name })
      );
      expect(state.ingredients).toEqual([
        { ...ingredient, categoryName: name }
      ]);
    });
  });

  describe("with a setRecipeUrl action", () => {
    it("should set the url of the current recipe", () => {
      const url = "https://example.com";
      const state = reducer(initialState, setRecipeUrl(url));
      expect(state.recipe.url).toEqual(url);
    });
  });

  describe("with a requestTitle action", () => {
    it("should set waitingFor to 'title'", () => {
      const state = reducer(initialState, requestTitle());
      expect(state.browserExtension.waitingFor).toEqual("title");
    });
  });

  describe("with a setRecipeTitle action", () => {
    it("should set the title of the current recipe", () => {
      const title = "my great recipe";
      const state = reducer(initialState, setRecipeTitle(title));
      expect(state.recipe.title).toEqual(title);
    });

    it("should set waitingFor to null", () => {
      const state = reducer(initialState, setRecipeTitle("title"));
      expect(state.browserExtension.waitingFor).toEqual(null);
    });
  });

  describe("with a requestServings action", () => {
    it("should set waitingFor to 'servings'", () => {
      const state = reducer(initialState, requestServings());
      expect(state.browserExtension.waitingFor).toEqual("servings");
    });
  });

  describe("with a setRecipeServings action", () => {
    it("should set the servings of the current recipe to a number", () => {
      const state = reducer(initialState, setRecipeServings("4"));
      expect(state.recipe.servings).toEqual(4);
    });

    it("should set waitingFor to null", () => {
      const state = reducer(initialState, setRecipeServings("4"));
      expect(state.browserExtension.waitingFor).toEqual(null);
    });

    describe("if there is text and numbers in the serving", () => {
      it("should just use the numbers", () => {
        const state = reducer(initialState, setRecipeServings("Serves 40"));
        expect(state.recipe.servings).toEqual(40);
      });
    });

    describe("if there are no numbers in the serving", () => {
      it("should return undefined", () => {
        const state = reducer(initialState, setRecipeServings("something"));
        expect(state.recipe.servings).toEqual(undefined);
      });
    });
  });
});
