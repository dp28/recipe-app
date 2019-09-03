import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { NavBar } from "./NavBar";
import { DocumentTitle } from "./DocumentTitle";
import { Loading } from "./Loading";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export function UnconnectedCookPage({ recipe }) {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <DocumentTitle title={recipe.title} />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Loading metaKey="recipe">
              <Paper className={classes.paper}>
                <h1>{recipe.title}</h1>
              </Paper>
            </Loading>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export function mapStateToProps(state) {
  return { recipe: state.recipe };
}

export const CookPage = connect(mapStateToProps)(UnconnectedCookPage);
