import { call, put } from "redux-saga/effects";
import { watchApiMetadataRequested, GET_API_METADATA } from "./apiMetadata";
import { performQuery } from "./performQuery";
import { errorLoadingApiMetadata, apiMetadataLoaded } from "../actions";

describe("watchApiMetadataRequested", () => {
  it(`should query the API`, () => {
    const generator = watchApiMetadataRequested();
    expect(generator.next().value).toEqual(
      call(performQuery, GET_API_METADATA)
    );
  });

  describe("when the API call succeeds", () => {
    it("should dispatch a apiMetadataLoaded action with the version", () => {
      const generator = watchApiMetadataRequested();
      const metadata = {
        version: "fake_version",
        deployedAt: new Date().toISOString(),
        environment: "fake"
      };
      generator.next();
      expect(generator.next({ _meta: metadata }).value).toEqual(
        put(apiMetadataLoaded(metadata))
      );
    });
  });

  describe("when the API call fails", () => {
    it("should dispatch a errorLoadingApiMetadata action with the error", () => {
      const generator = watchApiMetadataRequested();
      const error = new Error();
      generator.next();
      expect(generator.throw(error).value).toEqual(
        put(errorLoadingApiMetadata(error))
      );
    });
  });
});
