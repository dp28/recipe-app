import { call, put } from "redux-saga/effects";
import { errorLoadingVersion, versionLoaded } from "../actions";
import { performQuery } from "./performQuery";

export function* watchVersionRequested() {
  try {
    const result = yield call(performQuery, GET_VERSION_QUERY);
    yield put(versionLoaded(result._meta.currentVersion));
  } catch (error) {
    yield put(errorLoadingVersion(error));
  }
}

export const GET_VERSION_QUERY = `
  query getVersion {
    _meta {
      currentVersion
    }
  }
`;
