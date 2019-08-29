const { withMongoConnection } = require("../storage/mongo");
const { asyncTrace } = require("../utils/debug");

const typeDefs = `
  type Recipe {
    id: String!
    url: URL!
    title: String!
    servings: PositiveInt!
    ingredients: [Ingredient!]!
    method: Method!
  }

  type Ingredient {
    id: String!
    rawText: String!
    food: Food!
    measurement: Measurement
    instruction: String
    notes: String
  }

  type Food {
    name: String!
  }

  type Measurement {
    amount: PositiveFloat!
    unit: Unit
    size: String
  }

  type Unit {
    name: String!
    symbol: String
  }

  type Method {
    id: String!
    steps: [Step!]!
  }

  type Step {
    id: String!
    ordering: PositiveInt!
    rawText: String!
    ingredientIds: [String!]!
    timers: [Timer!]!
  }

  type Timer {
    unit: String!
    amount: PositiveFloat!
  }

  type Query {
    recipes: [Recipe!]!
  }
`;

const resolvers = {
  Query: {
    recipes: async () => {
      const recipes = await withMongoConnection(db =>
        db
          .collection("events")
          .find()
          .toArray()
      );
      return recipes.map(_ => _.payload.recipe);
    }
  },
  Recipe: {}
};
module.exports = { typeDefs, resolvers };
