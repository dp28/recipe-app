import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import yellow from "@material-ui/core/colors/yellow";
import * as actions from "../actions";

export function UnconnectedBrowserExtensionPage({
  recipe,
  waitingForTitle,
  requestTitle
}) {
  return (
    <div>
      <RecipeTitle
        requestTitle={requestTitle}
        waitingForTitle={waitingForTitle}
        title={recipe.title}
      />
      Recipe URL: {recipe.url}
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
      <Button onClick={requestTitle}>Set Title</Button>
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
    waitingForTitle: state.browserExtension.waitingForTitle
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    requestTitle: () => dispatch(actions.requestTitle())
  };
}

export const BrowserExtensionPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedBrowserExtensionPage);
