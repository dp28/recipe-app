const { validateConfig } = require("./index");

describe("validateConfig", () => {
  it("throws an error if a key is missing", () => {
    expect(() => {
      validateConfig({});
    }).toThrow();
  });
});

["development", "production"].forEach(environment => {
  const config = require(`./environment/${environment}`);

  describe(`${environment} config`, () => {
    it("should be valid", () => {
      expect(() => {
        validateConfig(config);
      }).not.toThrow();
    });

    it("should include the environment name", () => {
      expect(config.environment).toEqual(environment.toUpperCase());
    });
  });
});
