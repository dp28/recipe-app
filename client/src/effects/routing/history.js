import { createBrowserHistory } from "history";
import { store } from "../../state/store";
import { loadRecipes } from "../../actions";
import { debug } from "../../logging";

export const history = createBrowserHistory();

history.listen(onLocationChange);

function onLocationChange(location, action) {
  debug("URL change: ", action, location.pathname);
  if (location.pathname === "/") {
    store.dispatch(loadRecipes());
  }
}

onLocationChange(window.location, "PUSH");
