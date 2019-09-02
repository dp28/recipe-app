import { createBrowserHistory } from "history";
import { store } from "../../state/store";
import { loadRecipes, loadRecipeById } from "../../actions";
import { debug } from "../../logging";

export const history = createBrowserHistory();

const recipePathRegex = /\/recipes\/(\w+)/;

history.listen(onLocationChange);

function onLocationChange(location, action) {
  debug("URL change: ", action, location.pathname);
  if (location.pathname === "/") {
    store.dispatch(loadRecipes());
  }
  const match = location.pathname.match(recipePathRegex);
  if (match) {
    store.dispatch(loadRecipeById(match[1]));
  }
}

onLocationChange(window.location, "PUSH");
