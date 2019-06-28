const { createTestClient } = require("apollo-server-testing");
const { server } = require("./graphqlServer");
const { deployedAt, version } = require("./config");

const { query: executeQuery } = createTestClient(server);

describe("_meta", () => {
  it("should include the deployment time", async () => {
    const query = "{ _meta { deployedAt } }";
    const response = await executeQuery({ query });
    expect(response.data._meta.deployedAt).toEqual(deployedAt.toISOString());
  });

  it("should include the current version SHA", async () => {
    const query = "{ _meta { currentVersion } }";
    const response = await executeQuery({ query });
    expect(response.data._meta.currentVersion).toEqual(version);
  });

  it("should include the server environment", async () => {
    const query = "{ _meta { environment } }";
    const response = await executeQuery({ query });
    expect(response.data._meta.environment).toEqual("TEST");
  });
});
