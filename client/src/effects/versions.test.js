import { call, put } from "redux-saga/effects";
import { watchVersionRequested, GET_VERSION_QUERY } from "./versions";
import { performQuery } from "./performQuery";
import { errorLoadingVersion, versionLoaded } from "../actions";

describe("watchVersionRequested", () => {
  it(`should query the API`, () => {
    const generator = watchVersionRequested();
    expect(generator.next().value).toEqual(
      call(performQuery, GET_VERSION_QUERY)
    );
  });

  describe("when the API call succeeds", () => {
    it("should dispatch a versionLoaded action with the version", () => {
      const generator = watchVersionRequested();
      const currentVersion = "fake_version";
      generator.next();
      expect(generator.next({ _meta: { currentVersion } }).value).toEqual(
        put(versionLoaded(currentVersion))
      );
    });
  });

  describe("when the API call fails", () => {
    it("should dispatch a errorLoadingVersion action with the error", () => {
      const generator = watchVersionRequested();
      const error = new Error();
      generator.next();
      expect(generator.throw(error).value).toEqual(
        put(errorLoadingVersion(error))
      );
    });
  });
});
