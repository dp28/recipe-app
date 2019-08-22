import generateId from "cuid";
import { parse, loadPlugin } from "./nlp";
import { MeasuringUnitTag, compromisePlugin } from "./ingredientLexicon";

loadPlugin(compromisePlugin);

export function parseMethod({ ingredients, steps }) {
  return {
    id: generateId(),
    steps: parseSteps({ ingredients, steps })
  };
}

function parseSteps({ ingredients, steps }) {
  return steps.reduce(stepsReducer, {
    steps: [],
    ingredients
  }).steps;
}

function stepsReducer({ steps, ingredients }, rawText, index) {
  const { used, unused } = findIngredients(rawText, ingredients);
  const ingredientIds = used.map(_ => _.id);
  const step = parseStep({ rawText, index, ingredientIds });
  steps.push(step);
  return {
    steps,
    ingredients: unused
  };
}

function findIngredients(rawText, ingredients) {
  const nouns = new Set(toNormalizedNouns(rawText));
  return ingredients.reduce(
    ({ used, unused }, ingredient) => {
      const group = ingredientInNouns(ingredient, nouns) ? used : unused;
      group.push(ingredient);
      return { used, unused };
    },
    { used: [], unused: [] }
  );
}

function ingredientInNouns(ingredient, nouns) {
  const foodNouns = toNormalizedNouns(ingredient.food.name);
  return foodNouns.some(foodNoun => nouns.has(foodNoun));
}

function toNormalizedNouns(rawText) {
  return parse(rawText)
    .not(MeasuringUnitTag)
    .nouns()
    .toSingular()
    .data()
    .map(_ => _.main);
}

function parseStep({ rawText, index, ingredientIds }) {
  return {
    id: generateId(),
    ordering: index + 1,
    rawText,
    ingredientIds
  };
}
