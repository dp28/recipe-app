import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import yellow from "@material-ui/core/colors/yellow";
import * as actions from "../actions";

export function UnconnectedBrowserExtensionPage({
  recipe,
  waitingForTitle,
  waitingForServings,
  waitingForIngredients,
  waitingForMethod,
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod
}) {
  return (
    <div>
      <RecipeTitle
        requestTitle={requestTitle}
        waitingForTitle={waitingForTitle}
        title={recipe.title}
      />
      Recipe URL: {recipe.url}
      <RecipeServings
        requestServings={requestServings}
        waitingForServings={waitingForServings}
        servings={recipe.servings}
      />
      <RecipeIngredients
        requestIngredients={requestIngredients}
        waitingForIngredients={waitingForIngredients}
        ingredients={recipe.ingredients}
      />
      <RecipeMethod
        requestMethod={requestMethod}
        waitingForMethod={waitingForMethod}
        method={recipe.method}
      />
    </div>
  );
}

function RecipeTitle({ title, requestTitle, waitingForTitle }) {
  if (waitingForTitle) {
    return <Help>Click on the recipe title</Help>;
  }
  if (title) {
    return (
      <div>
        <h3>{title}</h3>
        <Button onClick={requestTitle}>Change title</Button>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={requestTitle}>Set title</Button>
    </div>
  );
}

function RecipeServings({ servings, requestServings, waitingForServings }) {
  if (waitingForServings) {
    return <Help>Click on the recipe servings</Help>;
  }
  if (servings) {
    return (
      <div>
        Servings: {servings}
        <Button onClick={requestServings}>Change servings</Button>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={requestServings}>Set servings</Button>
    </div>
  );
}

const useIngredientStyles = makeStyles(theme => ({
  list: {
    listStyle: "none",
    padding: theme.spacing(1)
  },
  ingredient: {
    marginBottom: theme.spacing(1)
  }
}));

function RecipeIngredients({
  ingredients,
  requestIngredients,
  waitingForIngredients
}) {
  const classes = useIngredientStyles();

  if (waitingForIngredients) {
    return (
      <Help>
        Click on the recipe ingredients. Each ingredient should be highlighted
        separately.
      </Help>
    );
  }
  if (ingredients) {
    return (
      <div>
        <h4>Ingredients</h4>
        <Button onClick={requestIngredients}>Change ingredients</Button>

        <ol className={classes.list}>
          {ingredients.map(ingredient => (
            <li key={ingredient.text} className={classes.ingredient}>
              {ingredient.text}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={requestIngredients}>Set ingredients</Button>
    </div>
  );
}

const useMethodStyles = makeStyles(theme => ({
  list: {
    listStyle: "decimal"
  },
  instruction: {
    marginBottom: theme.spacing(1)
  }
}));

function RecipeMethod({ method, requestMethod, waitingForMethod }) {
  const classes = useMethodStyles();

  if (waitingForMethod) {
    return (
      <Help>
        Click on the recipe instructions. Each instruction should be highlighted
        separately.
      </Help>
    );
  }
  if (method) {
    return (
      <div>
        <h4>Method</h4>
        <Button onClick={requestMethod}>Change instructions</Button>

        <ol className={classes.list}>
          {method.instructions.map(instruction => (
            <li key={instruction.text} className={classes.instruction}>
              {instruction.text}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={requestMethod}>Set instructions</Button>
    </div>
  );
}

const useHelpStyles = makeStyles(theme => ({
  instruction: {
    padding: theme.spacing(2),
    backgroundColor: yellow[200]
  }
}));

function Help({ children }) {
  const classes = useHelpStyles();
  return <div className={classes.instruction}>{children}</div>;
}

export function mapStateToProps(state) {
  return {
    recipe: state.recipe,
    waitingForTitle: state.browserExtension.waitingFor === "title",
    waitingForServings: state.browserExtension.waitingFor === "servings",
    waitingForIngredients: state.browserExtension.waitingFor === "ingredients",
    waitingForMethod: state.browserExtension.waitingFor === "method"
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    requestTitle: () => dispatch(actions.requestTitle()),
    requestServings: () => dispatch(actions.requestServings()),
    requestIngredients: () => dispatch(actions.requestIngredients()),
    requestMethod: () => dispatch(actions.requestMethod())
  };
}

export const BrowserExtensionPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedBrowserExtensionPage);
