import { store } from "../state/store";

export function enableIframeCommunication() {
  if (window.location === window.parent.location) {
    console.debug("Not in an iframe - skipping iframe communication");
    return;
  }

  window.addEventListener("message", action => {
    console.debug("Received message:", action);
    // store.dispatch(action);
  });

  // store.subscribe(); // or register some way of sending actions? middleware? saga?
}
