import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { pluralize } from "../language/utils";
import { isRoughUnitName } from "../language/units";

const useStyles = makeStyles(theme => ({
  ingredient: {},
  notes: {
    marginLeft: theme.spacing(0.5),
    fontStyle: "italic"
  },
  instruction: {
    fontStyle: "italic"
  },
  food: {}
}));

export function Ingredient({ ingredient }) {
  const classes = useStyles();

  return (
    <div className={classes.ingredient}>
      <Optional
        value={ingredient.measurement}
        render={measurement => <Measurement measurement={measurement} />}
      />

      <span className={classes.food}>
        {pluralizeFoodIfNecessary(ingredient.food.name, ingredient.measurement)}
      </span>

      <Optional
        value={ingredient.instruction}
        render={instruction => (
          <span className={classes.instruction}>, {instruction}</span>
        )}
      />
      <Optional
        value={ingredient.notes}
        render={notes => <span className={classes.notes}>({notes})</span>}
      />
    </div>
  );
}

function pluralizeFoodIfNecessary(foodName, measurement) {
  if (!measurement || measurement.unit || measurement.amount <= 1) {
    return foodName;
  }
  return pluralize(foodName);
}

function Optional({ value, render }) {
  if (!value) {
    return null;
  }
  return render(value);
}

const useMeasurementStyles = makeStyles(theme => ({
  measurement: {
    fontWeight: "bold"
  },
  amount: {
    marginRight: theme.spacing(0.5)
  },
  unit: {
    marginRight: theme.spacing(0.5)
  },
  size: {
    marginRight: theme.spacing(0.5)
  }
}));

function Measurement({ measurement }) {
  const classes = useMeasurementStyles();
  return (
    <span className={classes.measurement}>
      <Optional
        value={measurement.amount}
        render={amount => <span className={classes.amount}>{amount}</span>}
      />

      <Optional
        value={measurement.size}
        render={size => <span className={classes.size}>{size}</span>}
      />

      <Optional
        value={measurement.unit}
        render={unit => (
          <span className={classes.unit}>
            {pluralizeRoughUnit(unit, measurement.amount)}
          </span>
        )}
      />
    </span>
  );
}

function pluralizeRoughUnit(unit, amount) {
  if (!isRoughUnitName(unit) || !amount || amount === 1) {
    return unit;
  }
  return pluralize(unit);
}
