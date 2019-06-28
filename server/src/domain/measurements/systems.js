function buildQuantity(name) {
  return { name };
}

const Weight = buildQuantity("weight");
const Volume = buildQuantity("volume");
const Temperature = buildQuantity("temperature");

const Milligram = buildUnit("mg", "milligram", Weight);
const Gram = buildUnit("g", "gram", Weight);
const Kilogram = buildUnit("kg", "kilogram", Weight);
const Millilitre = buildUnit("ml", "millilitre", Volume);
const Litre = buildUnit("l", "litre", Volume);
const Celsius = buildUnit("c", "celsius", Temperature);

const Ounce = buildUnit("oz", "ounce", Weight);
const Pound = buildUnit("lb", "pound", Weight);
const Teaspoon = buildUnit("tsp", "teaspoon", Volume);
const Tablespoon = buildUnit("tbsp", "tablespoon", Volume);
const Cup = buildUnit("cup", "cup", Volume);
const Pint = buildUnit("pint", "pint", Volume);
const Gallon = buildUnit("gallon", "gallon", Volume);
const Fahrenheit = buildUnit("f", "fahrenheit", Temperature);

function buildUnit(symbol, name, quantity) {
  return { symbol, name, quantity };
}

module.export = {
  Metric: {
    name: "metric",
    units: [Milligram, Gram, Kilogram, Millilitre, Litre, Celsius]
  },
  Imperial: {
    name: "imperial",
    units: [Ounce, Pound, Teaspoon, Tablespoon, Cup, Pint, Gallon, Fahrenheit]
  },
  Milligram,
  Gram,
  Kilogram,
  Millilitre,
  Litre,
  Celsius,
  Ounce,
  Pound,
  Teaspoon,
  Tablespoon,
  Cup,
  Pint,
  Gallon,
  Fahrenheit
};
