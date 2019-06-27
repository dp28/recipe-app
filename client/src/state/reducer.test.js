import { reducer } from "./reducer";
import {
  apiMetadataLoaded,
  errorLoadingApiMetadata,
  requestApiMetadata
} from "../actions";

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty object", () => {
      expect(initialState).toEqual({ meta: { api: { loading: true } } });
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      const state = { meta: { api: { loading: false } } };
      expect(reducer(state, { type: "FAKE_ACTION" })).toBe(state);
    });
  });

  describe("with an apiMetadataLoaded action", () => {
    it("should set the API version", () => {
      const version = "fake_version";
      const newState = reducer(initialState, apiMetadataLoaded({ version }));
      expect(newState.meta.api.version).toEqual(version);
    });

    it("should set the API environment", () => {
      const environment = "fake_environment";
      const newState = reducer(
        initialState,
        apiMetadataLoaded({ environment })
      );
      expect(newState.meta.api.environment).toEqual(environment);
    });

    it("should set the API deployedAt time as a Date", () => {
      const deployedAtDate = new Date();
      const deployedAt = deployedAtDate.toISOString();
      const newState = reducer(initialState, apiMetadataLoaded({ deployedAt }));
      expect(newState.meta.api.deployedAt).toEqual(deployedAtDate);
    });

    it("should set loading to false", () => {
      const newState = reducer(initialState, apiMetadataLoaded({}));
      expect(newState.meta.api.loading).toBe(false);
    });
  });

  describe("with a requestApiMetadata action", () => {
    it("should set loading to true", () => {
      const state = reducer(initialState, apiMetadataLoaded({}));
      const newState = reducer(state, requestApiMetadata());
      expect(newState.meta.api.loading).toBe(true);
    });
  });

  describe("with an errorLoadingApiMetadata action", () => {
    it("should set the current API version", () => {
      const error = new Error();
      const newState = reducer(initialState, errorLoadingApiMetadata(error));
      expect(newState.meta.api.error).toEqual(error);
    });

    it("should set loading to false", () => {
      const newState = reducer(
        initialState,
        errorLoadingApiMetadata(new Error())
      );
      expect(newState.meta.api.loading).toBe(false);
    });
  });
});
