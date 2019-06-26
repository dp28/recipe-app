const { validateConfig } = require("./index");

describe("validateConfig", () => {
  it("throws an error if a key is missing", () => {
    expect(() => {
      validateConfig({});
    }).toThrow();
  });
});

function itShouldBehaveLikeAConfig(config) {
  it("should be valid", () => {
    expect(() => {
      validateConfig(config);
    }).not.toThrow();
  });

  it("should have a deployedAt date", () => {
    expect(config.deployedAt).toBeInstanceOf(Date);
  });
}

describe("development", () => {
  const config = require("./environment/development").buildConfig();

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("DEVELOPMENT");
  });
});

describe("production", () => {
  const config = require("./environment/production").buildConfig({
    fs: {
      statSync: () => ({ mtime: new Date() })
    }
  });

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("PRODUCTION");
  });
});

describe("test", () => {
  const config = require("./environment/test").buildConfig();

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("TEST");
  });
});
