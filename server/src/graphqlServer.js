const { ApolloServer, gql } = require("apollo-server-lambda");
const { getCurrentVersion } = require("./version");

const typeDefs = gql`
  type Query {
    hello: String
    _meta: ServiceMetaData!
  }

  type ServiceMetaData {
    currentVersion: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    _meta: () => ({ currentVersion: getCurrentVersion })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = { server };
