import React from "react";
import { connect } from "react-redux";

export function UnconnectedBrowserExtensionPage({ recipe }) {
  return <div>Recipe URL: {recipe.url}</div>;
}

export function mapStateToProps(state) {
  return { recipe: state.recipe };
}

export const BrowserExtensionPage = connect(mapStateToProps)(
  UnconnectedBrowserExtensionPage
);
