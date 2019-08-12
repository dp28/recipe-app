import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import * as actions from "../actions";
import { Help } from "./Help";

export function UnconnectedExtractTitle({
  title,
  requestTitle,
  waitingForTitle
}) {
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

export function mapStateToProps(state) {
  return {
    title: state.recipe.title,
    waitingForTitle: state.browserExtension.waitingFor === "title"
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    requestTitle: () => dispatch(actions.requestTitle())
  };
}

export const ExtractTitle = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedExtractTitle);
