import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  list: {
    listStyle: "none",
    textAlign: "left",
    padding: 0
  },
  ingredient: {
    padding: theme.spacing(1)
  }
}));

export function UnconnectedShoppingList({ ingredients }) {
  const classes = useStyles();

  return (
    <div>
      <h2>Shopping List</h2>

      <ul className={classes.list}>
        {ingredients.map(({ rawText, food, measurement }) => (
          <li key={rawText} className={classes.ingredient}>
            {[
              measurement && measurement.amount,
              measurement && measurement.unit && measurement.unit.symbol,
              food.name
            ].join(" ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    ingredients: Object.values(
      state.ingredients.reduce((results, ingredient) => {
        const key =
          ingredient.measurement && ingredient.measurement.unit
            ? ingredient.food.name + ingredient.measurement.unit.symbol
            : ingredient.food.name;
        if (results[key] && results[key].measurement) {
          results[key].measurement.amount += ingredient.measurement.amount;
        } else {
          results[key] = ingredient;
        }
        return results;
      }, {})
    )
  };
}

export const ShoppingList = connect(mapStateToProps)(UnconnectedShoppingList);
