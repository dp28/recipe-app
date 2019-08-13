import { all } from "redux-saga/effects";
import { rootSaga } from "./rootSaga";
import { watchApiMetadataRequested } from "./apiMetadata";

describe("rootSaga", () => {
  it(`should delegate to watchApiMetadataRequested`, () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([watchApiMetadataRequested]));
  });
});
