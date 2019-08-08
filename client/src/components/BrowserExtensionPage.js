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
  requestTitle,
  requestServings,
  requestIngredients
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
    </div>
  );
}

function RecipeTitle({ title, requestTitle, waitingForTitle }) {
  if (waitingForTitle) {
    return <Instruction>Click on the recipe title</Instruction>;
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
    return <Instruction>Click on the recipe servings</Instruction>;
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

function RecipeIngredients({
  ingredients,
  requestIngredients,
  waitingForIngredients
}) {
  if (waitingForIngredients) {
    return <Instruction>Click on the recipe ingredients</Instruction>;
  }
  if (ingredients) {
    return (
      <div>
        <h4>Ingredients</h4>
        <Button onClick={requestIngredients}>Change ingredients</Button>

        <ol>
          {ingredients.map(ingredient => (
            <li key={ingredient.text}>{ingredient.text}</li>
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

const useInstructionStyles = makeStyles(theme => ({
  instruction: {
    padding: theme.spacing(2),
    backgroundColor: yellow[200]
  }
}));

function Instruction({ children }) {
  const classes = useInstructionStyles();
  return <div className={classes.instruction}>{children}</div>;
}

export function mapStateToProps(state) {
  return {
    recipe: state.recipe,
    waitingForTitle: state.browserExtension.waitingFor === "title",
    waitingForServings: state.browserExtension.waitingFor === "servings",
    waitingForIngredients: state.browserExtension.waitingFor === "ingredients"
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    requestTitle: () => dispatch(actions.requestTitle()),
    requestServings: () => dispatch(actions.requestServings()),
    requestIngredients: () => dispatch(actions.requestIngredients())
  };
}

export const BrowserExtensionPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedBrowserExtensionPage);
