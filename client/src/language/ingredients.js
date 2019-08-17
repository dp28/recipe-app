import generateId from "cuid";
import { parse, loadPlugin } from "./nlp";
import {
  MeasuringUnitTag,
  SizeTag,
  compromisePlugin
} from "./ingredientLexicon";
import { parseUnit, isRoughUnitName } from "./units";

loadPlugin(compromisePlugin);

export function parseIngredient(rawText) {
  const preprocessed = preprocess(rawText);
  const { notes, rest } = splitOutNotes(preprocessed);
  const { instruction, ingredient } = splitOutInstruction(rest);
  const text = parse(ingredient);
  const measurement = parseMeasurement(text);
  return {
    id: generateId(),
    rawText,
    measurement,
    instruction,
    notes,
    food: parseFood(text, measurement)
  };
}

function preprocess(rawText) {
  return trimWhitespace(replaceFractions(separateNumbersFromLetters(rawText)));
}

function splitOutNotes(rawText) {
  const result = rawText.match(/([^(+]+)(\((.+)\))?/);
  return { notes: result[3], rest: result[1] };
}

function splitOutInstruction(rawText) {
  const parts = rawText.split(",");
  return {
    ingredient: parts[0],
    instruction: parts
      .slice(1)
      .join(",")
      .trim()
  };
}

function parseMeasurement(text) {
  const amount = text.values().numbers()[0];
  const unit = parseUnit(text);
  if (!amount && !unit) {
    return null;
  }
  if (!unit || isRoughUnitName(unit)) {
    return {
      amount: amount || 1,
      unit,
      size: parseSize(text)
    };
  }
  return { amount, unit };
}

const UNICODE_TO_TEXT = {
  "½": "1/2",
  "⅓": "1/3",
  "⅔": "2/3",
  "¼": "1/4",
  "¾": "3/4"
};

function trimWhitespace(rawText) {
  return rawText.replace(/ ,/g, ",");
}

function replaceFractions(rawText) {
  return rawText.split("").reduce((result, character) => {
    return (
      result +
      (UNICODE_TO_TEXT[character] ? UNICODE_TO_TEXT[character] : character)
    );
  }, "");
}

function separateNumbersFromLetters(rawText) {
  return rawText.replace(/(\d+)([a-zA-Z]+)\s/g, "$1 $2 ");
}

function parseFood(text, measurement) {
  const name = singularizeUnlessUnitsExist(text, measurement)
    .match("#Noun")
    .not("#ProperNoun")
    .toLowerCase()
    .all()
    .not(MeasuringUnitTag)
    .not(SizeTag)
    .not("#Value")
    .not("organic")
    .not("^(a|an)")
    .not("^of")
    .not("organic")
    .out()
    .trim();
  return { name };
}

function singularizeUnlessUnitsExist(text, measurement) {
  if (measurement && !measurement.unit) {
    return text
      .nouns()
      .toSingular()
      .all();
  }
  return text;
}

function parseSize(text) {
  return text
    .match(SizeTag)
    .trim()
    .out();
}
