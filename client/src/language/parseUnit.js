import { MeasuringUnitTag } from "./ingredientLexicon";
import { StandardisedUnits, RoughUnits } from "./units";

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
