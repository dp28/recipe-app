import React from "react";
import { Page } from "./Page";
import { Loading } from "./Loading";

export function PreloadPage({ children, waitFor }) {
  return (
    <Page>
      <Loading waitFor={waitFor}>{children}</Loading>
    </Page>
  );
}

export const preload = (waitFor, Component) => props => (
  <PreloadPage waitFor={waitFor}>
    <Component {...props} />
  </PreloadPage>
);
