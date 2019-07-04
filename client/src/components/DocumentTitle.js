import React from "react";

const setTitle = title => () => {
  document.title = title;
};

export function DocumentTitle({ title }) {
  React.useEffect(setTitle(title), [title]);
  return null;
}
