const { HerokuMongoURIRepository } = require("./herokuMongoURIRepository");

describe("HerokuMongoURIRepository", () => {
  describe("constructor", () => {
    it("should throw an error if the heroku API key is missing", () => {
      expect(() => new HerokuMongoURIRepository({})).toThrow();
    });

    it("should throw an error if the heroku mongo addon id is missing", () => {
      expect(() => new HerokuMongoURIRepository({})).toThrow();
    });

    it("should not throw an error if both the API key and addon id exist", () => {
      expect(
        () =>
          new HerokuMongoURIRepository({ apiKey: "fake", mongoAddonId: "id" })
      ).not.toThrow();
    });

    it("should set up an HTTP client with the correct URL", () => {
      const mockAxios = { create: jest.fn() };
      const mongoAddonId = "some_id";
      new HerokuMongoURIRepository({
        apiKey: "fake",
        mongoAddonId,
        axios: mockAxios
      });
      expect(mockAxios.create.mock.calls[0][0].baseURL).toEqual(
        `https://api.heroku.com/addons/${mongoAddonId}/config`
      );
    });

    it("should set up an HTTP client with the api key as the bearer token", () => {
      const mockAxios = { create: jest.fn() };
      const apiKey = "some_key";
      new HerokuMongoURIRepository({
        apiKey,
        mongoAddonId: "fake",
        axios: mockAxios
      });
      expect(mockAxios.create.mock.calls[0][0].headers.Authorization).toEqual(
        `Bearer ${apiKey}`
      );
    });

    it("should set up an HTTP client with the heroku v3 Accept header", () => {
      const mockAxios = { create: jest.fn() };
      new HerokuMongoURIRepository({
        apiKey: "fake",
        mongoAddonId: "fake",
        axios: mockAxios
      });
      expect(mockAxios.create.mock.calls[0][0].headers.Accept).toEqual(
        `application/vnd.heroku+json; version=3`
      );
    });
  });

  describe("get", () => {
    function buildRepoWithMockGet(result) {
      const repo = new HerokuMongoURIRepository({
        apiKey: "fake",
        mongoAddonId: "fake"
      });
      repo.http.get = jest.fn(() => Promise.resolve({ data: result }));
      return repo;
    }

    it("should return the URI value from the result", async () => {
      const uri = "fake_uri";
      const repo = buildRepoWithMockGet([{ name: "URI", value: uri }]);
      expect(await repo.get()).toEqual(uri);
    });
  });
});
