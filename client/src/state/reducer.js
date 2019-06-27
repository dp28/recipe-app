import { combineReducers } from "redux";
import {
  API_METADATA_LOADED,
  ERROR_LOADING_API_METADATA,
  REQUEST_API_METADATA
} from "../actions";

const metadataReducer = combineReducers({ api: apiMetadataReducer });

export const reducer = combineReducers({ meta: metadataReducer });

function apiMetadataReducer(state = { loading: true }, action) {
  switch (action.type) {
    case REQUEST_API_METADATA:
      return { loading: true };
    case API_METADATA_LOADED:
      return {
        version: action.version,
        environment: action.environment,
        deployedAt: new Date(Date.parse(action.deployedAt)),
        loading: false
      };
    case ERROR_LOADING_API_METADATA:
      return { error: action.error, loading: false };

    default:
      return state;
  }
}
