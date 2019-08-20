import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Favicon from "react-favicon";
import { ShoppingListPage } from "./ShoppingListPage";
import { ExtensionPage } from "../extensionInterface/components/ExtensionPage";
import { faviconPaths } from "../config";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export function App() {
  const classes = useStyles();

  return (
    <Router>
      <Favicon url={faviconPaths} />
      <div className={classes.root}>
        <Route path="/" exact component={ShoppingListPage} />
        <Route path="/as_browser_extension/" component={ExtensionPage} />
      </div>
    </Router>
  );
}
