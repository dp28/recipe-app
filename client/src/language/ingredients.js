import generateId from "cuid";
import nlp from "compromise";

const MeasuringUnit = "MeasuringUnit";
const StandardisedUnit = "StandardisedUnit";
const RoughUnit = "RoughUnit";
const Size = "Size";

const Sizes = ["small", "medium", "large", "medium-sized", "fair-sized"];

const StandardisedUnits = [
  { symbol: "g", name: "gram" },
  { symbol: "kg", name: "kilogram" },
  { symbol: "ml", name: "millilitre" },
  { symbol: "l", name: "litre" },
  { symbol: "tsp", name: "teaspoon" },
  { symbol: "tbsp", name: "tablespoon" },
  { symbol: "cup", name: "cup" },
  { symbol: "oz", name: "ounce" },
  { symbol: "lb", name: "pound" }
];

const RoughUnits = [
  { name: "bunch" },
  { name: "sprig" },
  { name: "clove" },
  { name: "pack" },
  { name: "packet" },
  { name: "handfull" },
  { name: "pinch" }
];

const unitsPlugin = {
  tags: {
    [MeasuringUnit]: {
      isA: "Unit"
    },

    [StandardisedUnit]: {
      isA: MeasuringUnit
    },
    [RoughUnit]: {
      isA: MeasuringUnit
    },
    [Size]: {
      isA: "Adjective"
    }
  },
  words: StandardisedUnits.reduce(
    (result, unit) => {
      result[unit.symbol] = StandardisedUnit;
      result[unit.name] = StandardisedUnit;
      result[pluralize(unit.name)] = StandardisedUnit;
      return result;
    },
    RoughUnits.reduce(
      (result, unit) => {
        result[unit.name] = RoughUnit;
        result[pluralize(unit.name)] = RoughUnit;
        return result;
      },
      Sizes.reduce((result, size) => {
        result[size] = Size;
        return result;
      }, {})
    )
  )
};

nlp.plugin(unitsPlugin);

export function parseIngredient(rawText) {
  const preprocessed = preprocess(rawText);
  const { notes, rest } = splitOutNotes(preprocessed);
  const { instruction, ingredient } = splitOutInstruction(rest);
  const text = nlp(ingredient);
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

function pluralize(noun) {
  return nlp(noun)
    .nouns()
    .toPlural()
    .out();
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
    .not(tag(MeasuringUnit))
    .not(tag(Size))
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

function parseUnit(text) {
  const unit = text
    .match(tag(MeasuringUnit))
    .trim()
    .toLowerCase()
    .nouns()
    .toSingular()
    .out();
  return unit ? toUnitSymbol(unit) : null;
}

function tag(type) {
  return `#${type}`;
}

function toUnitSymbol(input) {
  const unit = StandardisedUnits.find(
    ({ symbol, name }) => symbol === input || name === input
  );
  return unit ? unit.symbol : toRoughUnitName(input);
}

function toRoughUnitName(input) {
  const unit = RoughUnits.find(({ name }) => name === input);
  return unit ? unit.name : null;
}

function parseSize(text) {
  return text
    .match(tag(Size))
    .trim()
    .out();
}

function isRoughUnitName(unit) {
  return RoughUnits.some(({ name }) => name === unit);
}
