import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { combineIngredients } from "../actions";
import { combineIngredientsIfPossible } from "../domain/combineIngredients";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles(theme => ({
  list: {
    listStyle: "none",
    textAlign: "left",
    padding: theme.spacing(1),
    backgroundColor: "#f5f5f5"
  }
}));

export function UnconnectedShoppingList({
  ingredients,
  dispatchCombineIngredients
}) {
  const classes = useStyles();

  const onDragEnd = React.useCallback(
    result => {
      if (result.combine) {
        dispatchCombineIngredients([
          ingredients.get(result.combine.draggableId),
          ingredients.get(result.draggableId)
        ]);
      }
    },
    [dispatchCombineIngredients, ingredients]
  );

  return (
    <div>
      <h2>Shopping List</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="shoppingList" isCombineEnabled={true}>
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <ul
                className={classes.list}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {[...ingredients.values()].map((ingredient, index) => (
                  <Draggable
                    key={ingredient.rawText}
                    draggableId={ingredient.food.name}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Ingredient
                          ingredient={ingredient}
                          ingredients={ingredients}
                          combineWith={snapshot.combineWith}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    ingredients: state.ingredients.reduce((results, ingredient) => {
      const key = ingredient.food.name;
      const currentValue = results.get(key);
      if (currentValue && currentValue.measurement) {
        currentValue.measurement.amount += ingredient.measurement.amount;
      } else {
        results.set(key, ingredient);
      }
      return results;
    }, new Map())
  };
}

const useIngredientStyles = makeStyles(theme => ({
  ingredient: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    backgroundColor: "white"
  }
}));

function getCombinedIngredient(ingredient, combineWith, ingredients) {
  if (!ingredient.isCombined && combineWith && ingredients.get(combineWith)) {
    const combined = combineIngredientsIfPossible(
      [ingredients.get(combineWith), ingredient],
      { ignoreFood: true }
    );

    if (combined) {
      return { ...combined, isCombined: true };
    }
  }
  return { ...ingredient, isCombined: false };
}

function calculateBackgroundColour(ingredient, couldCombine) {
  if (!couldCombine) {
    return "white";
  }
  return ingredient.isCombined ? green[200] : red[200];
}

function Ingredient({ ingredient, ingredients, combineWith, isDragging }) {
  const classes = useIngredientStyles();
  const safeIngredient = getCombinedIngredient(
    ingredient,
    combineWith,
    ingredients
  );
  const backgroundColor = calculateBackgroundColour(
    safeIngredient,
    Boolean(combineWith)
  );
  const border = isDragging ? `1px solid black` : "none";

  return (
    <Paper className={classes.ingredient} style={{ border, backgroundColor }}>
      {[
        safeIngredient.measurement && safeIngredient.measurement.amount,
        safeIngredient.measurement &&
          safeIngredient.measurement.unit &&
          safeIngredient.measurement.unit.symbol,
        safeIngredient.food.name
      ].join(" ")}
    </Paper>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCombineIngredients: ingredients => {
      dispatch(combineIngredients(ingredients));
    }
  };
}

export const ShoppingList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedShoppingList);
