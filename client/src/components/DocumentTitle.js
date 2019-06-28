import React from "react";

export function DocumentTitle({ title }) {
  React.useEffect(
    () => {
      document.title = title;
    },
    [title]
  );
  return null;
}
