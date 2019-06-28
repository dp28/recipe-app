const { deployedAt, environment, version } = require("../config");

const typeDefs = `
  type Query {
    _meta: ServiceMetaData!
  }

  type ServiceMetaData {
    currentVersion: String!
    deployedAt: DateTime!
    environment: String!
  }
`;

const resolvers = {
  Query: {
    _meta: () => ({
      currentVersion: version,
      deployedAt,
      environment
    })
  }
};

module.exports = { typeDefs, resolvers };
