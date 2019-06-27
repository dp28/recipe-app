import { call, put } from "redux-saga/effects";
import { errorLoadingApiMetadata, apiMetadataLoaded } from "../actions";
import { performQuery } from "./performQuery";

export function* watchApiMetadataRequested() {
  try {
    const result = yield call(performQuery, GET_API_METADATA);
    yield put(apiMetadataLoaded(result._meta));
  } catch (error) {
    yield put(errorLoadingApiMetadata(error));
  }
}

export const GET_API_METADATA = `
  query getMetadata {
    _meta {
      version: currentVersion,
      environment,
      deployedAt
    }
  }
`;
