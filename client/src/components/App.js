import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Router, Route } from "react-router-dom";
import Favicon from "react-favicon";
import { HomePage } from "./HomePage";
import { ShoppingListPage } from "./ShoppingListPage";
import { ExtensionPage } from "../extensionInterface/components/ExtensionPage";
import { faviconPaths } from "../config";
import { history } from "../effects/routing/history";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export function App() {
  const classes = useStyles();

  return (
    <Router history={history}>
      <Favicon url={faviconPaths} />
      <div className={classes.root}>
        <Route path="/" exact component={HomePage} />
        <Route path="/shopping_list" exact component={ShoppingListPage} />
        <Route path="/as_browser_extension/" component={ExtensionPage} />
      </div>
    </Router>
  );
}
