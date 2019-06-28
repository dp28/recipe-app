const typeDefs = `
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
    text: String!
  }
`;

module.exports = { typeDefs };
