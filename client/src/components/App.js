import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ShoppingListPage } from "./ShoppingListPage";
import { ExtensionPage } from "../extensionInterface/components/ExtensionPage";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Route path="/" exact component={ShoppingListPage} />
        <Route path="/as_browser_extension/" component={ExtensionPage} />
      </div>
    </Router>
  );
}
