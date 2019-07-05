export function combineIngredientsIfPossible(
  ingredients,
  { ignoreFood = false } = {}
) {
  return ingredients.reduce((result, ingredient) => {
    if (
      !result ||
      (!ignoreFood && result.food.name !== ingredient.food.name) ||
      !result.measurement !== !ingredient.measurement
    ) {
      return null;
    }
    if (!result.measurement) {
      return result;
    }
    if (haveSameUnits(result.measurement, ingredient.measurement)) {
      return {
        ...result,
        measurement: {
          ...result.measurement,
          amount: result.measurement.amount + ingredient.measurement.amount
        }
      };
    }
    return null;
  });
}

function haveSameUnits(first, second) {
  return getUnitSymbol(first) === getUnitSymbol(second);
}

function getUnitSymbol(measurement) {
  return measurement && measurement.unit && measurement.unit.symbol;
}
