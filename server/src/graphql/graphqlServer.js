const { ApolloServer, gql } = require("apollo-server-lambda");
const { mergeResolvers, mergeTypes } = require("merge-graphql-schemas");
const schemas = [require("./meta"), require("./external")];

const typeDefs = mergeTypes(schemas.map(_ => _.typeDefs), { all: true });
const resolvers = mergeResolvers(schemas.map(_ => _.resolvers));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = { server };
