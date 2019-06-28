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

const typeDefs = `
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
  URL
};

module.exports = { typeDefs, resolvers };
