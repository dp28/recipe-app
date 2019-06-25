import { reducer } from "./reducer";
import { versionLoaded } from "../actions";

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty object", () => {
      expect(initialState).toEqual({ meta: { apiVersion: null } });
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      const state = {};
      expect(reducer(state, { type: "FAKE_ACTION" })).toBe(state);
    });
  });

  describe("with a versionLoaded action", () => {
    it("should set thew current API version", () => {
      const version = "fake_version";
      const newState = reducer(initialState, versionLoaded(version));
      expect(newState.meta.apiVersion).toEqual(version);
    });
  });
});
