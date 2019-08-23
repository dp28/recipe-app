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
  const text = parse(rawText);
  const { used, unused } = findIngredients(text, ingredients);
  const ingredientIds = used.map(_ => _.id);
  const step = parseStep({ rawText, text, index, ingredientIds });
  steps.push(step);
  return {
    steps,
    ingredients: unused
  };
}

function findIngredients(text, ingredients) {
  const nouns = new Set(toNormalizedNouns(text));
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
  const foodNouns = toNormalizedNouns(parse(ingredient.food.name));
  return foodNouns.some(foodNoun => nouns.has(foodNoun));
}

function toNormalizedNouns(text) {
  return text
    .not(MeasuringUnitTag)
    .nouns()
    .toSingular()
    .data()
    .map(_ => _.main);
}

function parseStep({ rawText, text, index, ingredientIds }) {
  const timers = parseTimers(text);
  return {
    id: generateId(),
    ordering: index + 1,
    rawText,
    ingredientIds,
    timers
  };
}

function parseTimers(text) {
  return text
    .replace("half", "0.5")
    .match("#Value .? (minute|hour)")
    .not("a minute")
    .map(timeText => ({
      unit: timeText
        .match("(minute|hour)")
        .normalize()
        .out()
        .replace(/\W/g, ""),
      amount: timeText.values().numbers()[0]
    }));
}
