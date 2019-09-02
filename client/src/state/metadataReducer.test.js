import { metadataReducer as reducer } from "./metadataReducer";
import {
  apiMetadataLoaded,
  errorLoadingApiMetadata,
  requestApiMetadata,
  recipesLoaded,
  loadRecipes,
  errorLoadingRecipes,
  loadRecipeById,
  loadRecipeByURL,
  errorLoadingRecipe,
  recipeLoaded
} from "../actions";

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return the expected initial state", () => {
      expect(initialState).toEqual({
        api: { loading: true },
        recipes: { loading: false },
        recipe: { loading: false }
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
      expect(newState.api.version).toEqual(version);
    });

    it("should set the API environment", () => {
      const environment = "fake_environment";
      const newState = reducer(
        initialState,
        apiMetadataLoaded({ environment })
      );
      expect(newState.api.environment).toEqual(environment);
    });

    it("should set the API deployedAt time as a Date", () => {
      const deployedAtDate = new Date();
      const deployedAt = deployedAtDate.toISOString();
      const newState = reducer(initialState, apiMetadataLoaded({ deployedAt }));
      expect(newState.api.deployedAt).toEqual(deployedAtDate);
    });

    it("should set loading to false", () => {
      const newState = reducer(initialState, apiMetadataLoaded({}));
      expect(newState.api.loading).toBe(false);
    });
  });

  describe("with a requestApiMetadata action", () => {
    it("should set loading to true", () => {
      const state = reducer(initialState, apiMetadataLoaded({}));
      const newState = reducer(state, requestApiMetadata());
      expect(newState.api.loading).toBe(true);
    });
  });

  describe("with an errorLoadingApiMetadata action", () => {
    it("should set the current API version", () => {
      const error = new Error();
      const newState = reducer(initialState, errorLoadingApiMetadata(error));
      expect(newState.api.error).toEqual(error);
    });

    it("should set loading to false", () => {
      const newState = reducer(
        initialState,
        errorLoadingApiMetadata(new Error())
      );
      expect(newState.api.loading).toBe(false);
    });
  });

  describe("with an recipesLoaded action", () => {
    it("should set loading to false", () => {
      const newState = reducer(initialState, recipesLoaded({}));
      expect(newState.recipes.loading).toBe(false);
    });
  });

  describe("with a loadRecipes action", () => {
    it("should set loading to true", () => {
      const state = reducer(initialState, recipesLoaded({}));
      const newState = reducer(state, loadRecipes());
      expect(newState.recipes.loading).toBe(true);
    });
  });

  describe("with an errorLoadingRecipes action", () => {
    it("should store the error", () => {
      const error = new Error();
      const newState = reducer(initialState, errorLoadingRecipes(error));
      expect(newState.recipes.error).toEqual(error);
    });

    it("should set loading to false", () => {
      const newState = reducer(initialState, errorLoadingRecipes(new Error()));
      expect(newState.recipes.loading).toBe(false);
    });
  });

  describe("with an recipeLoaded action", () => {
    it("should set loading to false", () => {
      const newState = reducer(initialState, recipeLoaded({}));
      expect(newState.recipe.loading).toBe(false);
    });
  });

  describe("with a loadRecipeById action", () => {
    it("should set loading to true", () => {
      const state = reducer(initialState, loadRecipeById("fake"));
      expect(state.recipe.loading).toBe(true);
    });
  });

  describe("with a loadRecipeByURL action", () => {
    it("should set loading to true", () => {
      const state = reducer(initialState, loadRecipeByURL("fake"));
      expect(state.recipe.loading).toBe(true);
    });
  });

  describe("with an errorLoadingRecipes action", () => {
    it("should store the error", () => {
      const error = new Error();
      const newState = reducer(initialState, errorLoadingRecipe(error));
      expect(newState.recipe.error).toEqual(error);
    });

    it("should set loading to false", () => {
      const newState = reducer(initialState, errorLoadingRecipe(new Error()));
      expect(newState.recipe.loading).toBe(false);
    });
  });
});
