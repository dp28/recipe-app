const typeDefs = `
  input RecipeInput {
    url: URL!
  }

  input RecipeParserInput {
    url: URL!
    name: ParseInstruction!
    servings: ParseInstruction!
    ingredients: [ParseInstruction!]!
    method: [ParseInstruction!]!
  }

  scalar ParseInstruction

  type Recipe {
    name: String!
    url: URL!
    servings: PositiveInt!
    ingredients: [Ingredient!]!
    method: Method!
  }

  type Ingredient {
    food: Food!
    measurement: Measurement!
  }

  type Food {
    name: String!
  }

  type Measurement {
    amount: PositiveFloat!
    unit: Unit!
  }

  type Unit {
    name: String!
    symbol: String!
    measurementSystem: MeasurementSystem!
    quantity: Quantity!
  }

  type MeasurementSystem {
    name: String!
    units: [Unit!]!
  }

  type Quantity {
    name: String!
  }

  type UnitConversionRatio {
    from: Unit!
    to: Unit!
    factor: PositiveFloat!
  }

  type Method {
    instructions: [Instruction!]!
  }

  type Instruction {
    index: PositiveInt!
    text: String!
  }

  type RecipeParseResult {
    recipe: Recipe!
  }

  type Query {
    recipes: [Recipe!]!
  }

  type Mutation {
    addRecipe(input: RecipeInput!): RecipeParseResult!
    addRecipeParser(input: RecipeParserInput!): RecipeParseResult!
  }
`;

module.exports = { typeDefs };
