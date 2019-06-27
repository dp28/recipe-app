import { takeLatest } from "redux-saga/effects";
import { rootSaga } from "./rootSaga";
import { watchApiMetadataRequested } from "./apiMetadata";
import { REQUEST_API_METADATA, requestApiMetadata } from "../actions";

describe("rootSaga", () => {
  it(`should delegate ${REQUEST_API_METADATA} actions to watchApiMetadataRequested`, () => {
    const generator = rootSaga();
    expect(generator.next(requestApiMetadata()).value).toEqual(
      takeLatest(REQUEST_API_METADATA, watchApiMetadataRequested)
    );
  });
});
