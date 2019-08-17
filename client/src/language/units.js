import { MeasuringUnitTag } from "./ingredientLexicon";

export const StandardisedUnits = [
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

export const RoughUnits = [
  { name: "bunch" },
  { name: "sprig" },
  { name: "clove" },
  { name: "pack" },
  { name: "packet" },
  { name: "handfull" },
  { name: "pinch" }
];

export function isRoughUnitName(unit) {
  return RoughUnits.some(({ name }) => name === unit);
}

export function parseUnit(text) {
  const unit = text
    .match(MeasuringUnitTag)
    .trim()
    .toLowerCase()
    .nouns()
    .toSingular()
    .out();
  return unit ? toUnitSymbol(unit) : null;
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
