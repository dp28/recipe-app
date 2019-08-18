export const StandardisedUnits = [
  { symbol: "g", name: "gram" },
  { symbol: "kg", name: "kilogram" },
  { symbol: "ml", name: "millilitre" },
  { symbol: "l", name: "litre" },
  { symbol: "tsp", name: "teaspoon" },
  { symbol: "tbsp", name: "tablespoon" },
  { symbol: "cup", name: "cup" },
  { symbol: "oz", name: "ounce" },
  { symbol: "lb", name: "pound" }
];

export const RoughUnits = [
  { name: "bunch" },
  { name: "sprig" },
  { name: "clove" },
  { name: "pack" },
  { name: "packet" },
  { name: "handfull" },
  { name: "pinch" }
];

export function isRoughUnitName(unit) {
  return RoughUnits.some(({ name }) => name === unit);
}
