import {
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod
} from "./actions";

export const OrderedExtractionSteps = [
  {
    property: "title",
    buildRequest: requestTitle,
    isFinished: recipe => Boolean(recipe && recipe.title)
  },
  {
    property: "servings",
    buildRequest: requestServings,
    isFinished: recipe => Boolean(recipe.servings)
  },
  {
    property: "ingredients",
    buildRequest: requestIngredients,
    isFinished: recipe =>
      Boolean(recipe.ingredients && recipe.ingredients.length > 0)
  },
  {
    property: "method",
    buildRequest: requestMethod,
    isFinished: ({ method }) =>
      Boolean(method && method.steps && method.steps.length > 0)
  }
];
