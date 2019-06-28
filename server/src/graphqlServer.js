const { ApolloServer, gql } = require("apollo-server-lambda");
const { deployedAt, environment, version } = require("./config");
const {
  DateTime,
  NonPositiveInt,
  PositiveInt,
  NonNegativeInt,
  NegativeInt,
  NonPositiveFloat,
  PositiveFloat,
  NonNegativeFloat,
  NegativeFloat,
  EmailAddress,
  URL
} = require("@okgrow/graphql-scalars");

const typeDefs = gql`
  scalar DateTime

  scalar EmailAddress

  scalar URL

  scalar NegativeFloat

  scalar NegativeInt

  scalar NonNegativeFloat

  scalar NonNegativeInt

  scalar NonPositiveFloat

  scalar NonPositiveInt

  scalar PositiveFloat

  scalar PositiveInt

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
  DateTime,
  NonPositiveInt,
  PositiveInt,
  NonNegativeInt,
  NegativeInt,
  NonPositiveFloat,
  PositiveFloat,
  NonNegativeFloat,
  NegativeFloat,
  EmailAddress,
  URL,
  Query: {
    _meta: () => ({
      currentVersion: version,
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
