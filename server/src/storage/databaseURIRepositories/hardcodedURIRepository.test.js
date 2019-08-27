const { HardcodedURIRepository } = require("./hardcodedURIRepository");

describe("HardcodedURIRepository", () => {
  describe("constructor", () => {
    it("should throw an error if the URI is missing", () => {
      expect(() => new HardcodedURIRepository({})).toThrow();
    });

    it("should throw an error if the heroku mongo addon id is missing", () => {
      expect(() => new HardcodedURIRepository({})).toThrow();
    });

    it("should not throw an error if URI exists", () => {
      expect(() => new HardcodedURIRepository({ uri: "fake" })).not.toThrow();
    });
  });

  describe("get", () => {
    it("should return the URI value from the constructor", async () => {
      const uri = "fake_uri";
      const repo = new HardcodedURIRepository({ uri });
      expect(await repo.get()).toEqual(uri);
    });
  });
});
