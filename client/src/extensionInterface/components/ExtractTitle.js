import React from "react";
import { requestTitle } from "../actions";
import { Extract } from "./Extract";

export function ExtractTitle() {
  return (
    <Extract property="title" requestBuilder={requestTitle}>
      {title => <div>{title}</div>}
    </Extract>
  );
}
