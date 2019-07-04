const parseRegex = /(\d+)(\w*)\W+(.+)/;

export function parseIngredient(rawText) {
  const match = parseRegex.exec(rawText);
  if (!match) {
    return { rawText, food: { name: rawText }, measurement: null };
  }
  return {
    rawText,
    food: {
      name: match[3]
    },
    measurement: {
      amount: parseInt(match[1]),
      unit: match[2] ? { symbol: match[2] } : null
    }
  };
}
