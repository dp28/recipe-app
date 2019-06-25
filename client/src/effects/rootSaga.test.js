import { takeLatest } from "redux-saga/effects";
import { rootSaga } from "./rootSaga";
import { watchVersionRequested } from "./versions";
import { REQUEST_VERSION, requestVersion } from "../actions";

describe("rootSaga", () => {
  it(`should delegate ${REQUEST_VERSION} actions to watchVersionRequested`, () => {
    const generator = rootSaga();
    expect(generator.next(requestVersion()).value).toEqual(
      takeLatest(REQUEST_VERSION, watchVersionRequested)
    );
  });
});
