import { API_METADATA_LOADED } from "../actions";

const InitialState = { meta: { apiVersion: null } };

export function reducer(state = InitialState, action) {
  switch (action.type) {
    case API_METADATA_LOADED:
      return { ...state, meta: { ...state.meta, apiVersion: action.version } };

    default:
      return state;
  }
}
