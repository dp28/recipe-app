const { saveEvent, withMongoConnection } = require("../storage/mongo");
const { asyncTrace } = require("../utils/debug");
const { recipeImported } = require("../domain/events");
const { info } = require("../utils/logging");

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
    unit: String
    size: String
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
    id: String!
    seconds: PositiveFloat!
  }

  type ImportRecipeEvent {
    id: String!
    type: String!
    occurredAt: DateTime!
    payload: ImportRecipeEventPayload!
  }

  type ImportRecipeEventPayload {
    recipe: Recipe!
  }

  type ImportRecipeResult {
    event: ImportRecipeEvent!
  }

  input RecipeInput {
    id: String!
    url: URL!
    title: String!
    servings: PositiveInt!
    ingredients: [IngredientInput!]!
    method: MethodInput!
  }

  input IngredientInput {
    id: String!
    rawText: String!
    food: FoodInput!
    measurement: MeasurementInput
    instruction: String
    notes: String
  }

  input FoodInput {
    name: String!
  }

  input MeasurementInput {
    amount: PositiveFloat!
    unit: String
    size: String
  }

  input MethodInput {
    id: String!
    steps: [StepInput!]!
  }

  input StepInput {
    id: String!
    ordering: PositiveInt!
    rawText: String!
    ingredientIds: [String!]!
    timers: [TimerInput!]!
  }

  input TimerInput {
    id: String!
    seconds: PositiveFloat!
  }

  type Query {
    recipes: [Recipe!]!
    findRecipeById(id: String!): Recipe
    findRecipeByURL(url: URL!): Recipe
  }

  type Mutation {
    importRecipe(recipe: RecipeInput): ImportRecipeResult!
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
    },
    findRecipeById: async (_parent, { id }) => {
      const event = await withMongoConnection(db =>
        db.collection("events").findOne({ "payload.recipe.id": id })
      );
      return event ? event.payload.recipe : event;
    },
    findRecipeByURL: async (_parent, { url }) => {
      const event = await withMongoConnection(db =>
        db.collection("events").findOne({ "payload.recipe.url": url })
      );
      return event ? event.payload.recipe : event;
    }
  },
  Mutation: {
    importRecipe: async (_parent, { recipe }) => {
      info("Importing recipe from", recipe.url);
      const event = recipeImported(recipe);
      await saveEvent(event);
      return { event };
    }
  },
  Recipe: {},
  ImportRecipeResult: {},
  ImportRecipeEventPayload: {},
  ImportRecipeEvent: {}
};
module.exports = { typeDefs, resolvers };
