import React from "react";
import { connect } from "react-redux";

export function UnconnectedLoading({ loading, error, children }) {
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading ...</div>;
  }
  return children;
}

export function mapStateToProps(state, { waitFor }) {
  return state.meta[waitFor];
}

export const Loading = connect(mapStateToProps)(UnconnectedLoading);
