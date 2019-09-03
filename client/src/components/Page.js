import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { NavBar } from "./NavBar";
import { DocumentTitle } from "./DocumentTitle";
import { appName } from "../config";

export function Page({ children, title = appName }) {
  return (
    <div>
      <NavBar />
      <DocumentTitle title={title} />
      <Container>
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Container>
    </div>
  );
}
