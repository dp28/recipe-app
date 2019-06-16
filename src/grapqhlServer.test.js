const { createTestClient } = require("apollo-server-testing");
const { server } = require("./graphqlServer");

const { query } = createTestClient(server);

describe("hello", () => {
  it('should return "hello, world"', async () => {
    const helloQuery = "{ hello }";
    const response = await query({ query: helloQuery });
    expect(response.data.hello).toEqual("Hello, world!");
  });
});
