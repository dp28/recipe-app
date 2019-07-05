import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { combineIngredients, addCategory, addToCategory } from "../actions";
import { combineIngredientsIfPossible } from "../domain/combineIngredients";

const UNCATEGORIZED = "__uncategorized";

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
  categories,
  ingredientsByCategory,
  dispatchCombineIngredients,
  dispatchAddCategory,
  dispatchAddToCategory
}) {
  const classes = useStyles();

  const onDragEnd = React.useCallback(
    result => {
      const ingredient = ingredients.get(result.draggableId);
      if (result.combine) {
        dispatchCombineIngredients([
          ingredients.get(result.combine.draggableId),
          ingredient
        ]);
      }

      if (result.destination) {
        const categoryName =
          result.destination.droppableId === UNCATEGORIZED
            ? null
            : result.destination.droppableId;
        dispatchAddToCategory({ ingredient, categoryName });
      }
    },
    [dispatchCombineIngredients, ingredients, dispatchAddToCategory]
  );

  return (
    <div>
      <h2>Shopping List</h2>
      <form onSubmit={dispatchAddCategory}>
        <TextField id="name" type="text" placeholder="New category" />
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        {categories.map(({ name }) => (
          <Droppable key={name} droppableId={name} isCombineEnabled={true}>
            {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <div>
                  <h3>{name}</h3>
                  <ul
                    className={classes.list}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {(ingredientsByCategory[name] || []).map(
                      (ingredient, index) => (
                        <DraggableIngredient
                          key={ingredient.rawText}
                          ingredient={ingredient}
                          ingredients={ingredients}
                          index={index}
                        />
                      )
                    )}
                    {provided.placeholder}
                  </ul>
                </div>
              </RootRef>
            )}
          </Droppable>
        ))}
        <Droppable droppableId={UNCATEGORIZED} isCombineEnabled={true}>
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <ul
                className={classes.list}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {(ingredientsByCategory[UNCATEGORIZED] || []).map(
                  (ingredient, index) => (
                    <DraggableIngredient
                      key={ingredient.rawText}
                      ingredient={ingredient}
                      ingredients={ingredients}
                      index={index}
                    />
                  )
                )}
                {provided.placeholder}
              </ul>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
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

function DraggableIngredient({ ingredient, ingredients, index }) {
  return (
    <Draggable draggableId={ingredient.food.name} index={index}>
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
  );
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

export function mapStateToProps(state) {
  const ingredients = state.ingredients.reduce((results, ingredient) => {
    const key = ingredient.food.name;
    const currentValue = results.get(key);
    if (currentValue && currentValue.measurement) {
      currentValue.measurement.amount += ingredient.measurement.amount;
    } else {
      results.set(key, ingredient);
    }
    return results;
  }, new Map());

  return {
    ingredients: ingredients,
    ingredientsByCategory: [...ingredients.values()].reduce(
      (map, ingredient) => {
        const categoryName = ingredient.categoryName || UNCATEGORIZED;
        const ingredientsInCategory = map[categoryName] || [];
        ingredientsInCategory.push(ingredient);
        map[categoryName] = ingredientsInCategory;
        return map;
      },
      {}
    ),
    categories: state.categories
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCombineIngredients: ingredients => {
      dispatch(combineIngredients(ingredients));
    },
    dispatchAddCategory: event => {
      event.preventDefault();
      const name = event.target.name.value;
      if (name) {
        dispatch(addCategory({ name }));
      }
    },
    dispatchAddToCategory: ({ ingredient, categoryName }) => {
      dispatch(addToCategory({ ingredient, categoryName }));
    }
  };
}

export const ShoppingList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedShoppingList);
