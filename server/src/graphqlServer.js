const { ApolloServer, gql } = require("apollo-server-lambda");
const { getCurrentVersion } = require("./version");
const { deployedAt, environment } = require("./config");
const { GraphQLDateTime } = require("graphql-iso-date");

const typeDefs = gql`
  scalar DateTime

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
  DateTime: GraphQLDateTime,
  Query: {
    _meta: () => ({
      currentVersion: getCurrentVersion,
      deployedAt,
      environment
    })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = { server };
