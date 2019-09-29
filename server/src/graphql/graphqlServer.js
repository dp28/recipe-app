const { ApolloServer, gql } = require("apollo-server-lambda");
const { ApolloLogExtension } = require("apollo-log");
const { mergeResolvers, mergeTypes } = require("merge-graphql-schemas");
const schemas = [require("./meta"), require("./external"), require("./recipe")];

const typeDefs = mergeTypes(schemas.map(_ => _.typeDefs), { all: true });
const resolvers = mergeResolvers(schemas.map(_ => _.resolvers));
const extensions = [() => new ApolloLogExtension({ timestamp: true })];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  extensions
});

module.exports = { server };
