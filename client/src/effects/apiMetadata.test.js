import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchApiMetadata,
  GET_API_METADATA,
  watchApiMetadataRequested
} from "./apiMetadata";
import { performQuery } from "./performQuery";
import { errorLoadingApiMetadata, apiMetadataLoaded } from "../actions";
import { REQUEST_API_METADATA, requestApiMetadata } from "../actions";

describe("fetchApiMetadata", () => {
  it(`should query the API`, () => {
    const generator = fetchApiMetadata();
    expect(generator.next().value).toEqual(
      call(performQuery, GET_API_METADATA)
    );
  });

  describe("when the API call succeeds", () => {
    it("should dispatch a apiMetadataLoaded action with the version", () => {
      const generator = fetchApiMetadata();
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
      const generator = fetchApiMetadata();
      const error = new Error();
      generator.next();
      expect(generator.throw(error).value).toEqual(
        put(errorLoadingApiMetadata(error))
      );
    });
  });
});

describe("watchApiMetadataRequested", () => {
  it(`should delegate ${REQUEST_API_METADATA} actions to fetchApiMetadata`, () => {
    const generator = watchApiMetadataRequested();
    expect(generator.next(requestApiMetadata()).value).toEqual(
      takeLatest(REQUEST_API_METADATA, fetchApiMetadata)
    );
  });
});
