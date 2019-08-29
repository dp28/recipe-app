const generateId = require("cuid");

const RECIPE_IMPORTED = "RECIPE_IMPORTED";

const recipeImported = recipe => ({
  id: generateId,
  type: RECIPE_IMPORTED,
  occuredAt: new Date(),
  payload: { recipe }
});

module.exports = { RECIPE_IMPORTED, recipeImported };
