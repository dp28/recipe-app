import { pluralize } from "./utils";
import { tag } from "./nlp";
import { RoughUnits, StandardisedUnits } from "./units";

const MeasuringUnit = "MeasuringUnit";
const StandardisedUnit = "StandardisedUnit";
const RoughUnit = "RoughUnit";
const Size = "Size";

export const MeasuringUnitTag = tag(MeasuringUnit);
export const StandardisedUnitTag = tag(StandardisedUnit);
export const RoughUnitTag = tag(RoughUnit);
export const SizeTag = tag(Size);

const Sizes = ["small", "medium", "large", "medium-sized", "fair-sized"];

export const compromisePlugin = {
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
