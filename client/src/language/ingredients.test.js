import { parseIngredient } from "./ingredients";

describe("parseIngredient", () => {
  [
    {
      input: "25 g butter",
      expected: {
        food: "butter",
        measurement: {
          unit: "g",
          amount: 25
        }
      }
    },
    {
      input: "25g Butter",
      expected: {
        food: "Butter",
        measurement: {
          unit: "g",
          amount: 25
        }
      }
    },
    {
      input: "2 onions",
      expected: {
        food: "onion",
        measurement: {
          unit: null,
          amount: 2
        }
      }
    },
    {
      input: "2 Onions",
      expected: {
        food: "onion",
        measurement: {
          unit: null,
          amount: 2
        }
      }
    },
    {
      input: "400g risotto rice",
      expected: {
        food: "risotto rice",
        measurement: {
          unit: "g",
          amount: 400
        }
      }
    },
    {
      input: "150 ml white wine",
      expected: {
        food: "white wine",
        measurement: {
          unit: "ml",
          amount: 150
        }
      }
    },
    {
      input: "1 litre organic chicken or vegetable stock",
      expected: {
        food: "chicken or vegetable stock",
        measurement: {
          unit: "l",
          amount: 1
        }
      }
    },
    {
      input: "½ onion , finely chopped",
      expected: {
        food: "onion",
        instruction: "finely chopped",
        measurement: {
          unit: null,
          amount: 0.5
        }
      }
    },
    {
      input: "⅓ onion",
      expected: {
        food: "onion",
        measurement: {
          unit: null,
          amount: 0.3333333333333333
        }
      }
    },
    {
      input: "⅔ potato",
      expected: {
        food: "potato",
        measurement: {
          unit: null,
          amount: 0.6666666666666666
        }
      }
    },
    {
      input: "¼ potato",
      expected: {
        food: "potato",
        measurement: {
          unit: null,
          amount: 0.25
        }
      }
    },
    {
      input: "¾ potato",
      expected: {
        food: "potato",
        measurement: {
          unit: null,
          amount: 0.75
        }
      }
    },

    {
      input: "100 g higher-welfare streaky bacon , cut into matchsticks",
      expected: {
        food: "higher-welfare streaky bacon",
        instruction: "cut into matchsticks",
        measurement: { amount: 100, unit: "g" }
      }
    },
    {
      input: "1 bunch fresh thyme",
      expected: {
        food: "fresh thyme",
        measurement: { amount: 1, unit: "bunch" }
      }
    },
    {
      input: "200 g frozen peas",
      expected: { food: "frozen peas", measurement: { amount: 200, unit: "g" } }
    },
    {
      input: "sea salt",
      expected: { food: "sea salt", measurement: null }
    },
    {
      input: "freshly ground black pepper",
      expected: { food: "freshly ground black pepper", measurement: null }
    },
    {
      input: "100 g crumbly goat's cheese",
      expected: {
        food: "crumbly goat's cheese",
        measurement: { amount: 100, unit: "g" }
      }
    },
    {
      input: "75 g Parmesan cheese , freshly grated",
      expected: {
        food: "Parmesan cheese",
        instruction: "freshly grated",
        measurement: { amount: 75, unit: "g" }
      }
    },

    {
      input: "200 ml warm water",
      expected: { food: "warm water", measurement: { amount: 200, unit: "ml" } }
    },
    {
      input: "1 tsp sugar",
      expected: { food: "sugar", measurement: { amount: 1, unit: "tsp" } }
    },
    {
      input: "500 g strong bread flour",
      expected: {
        food: "strong bread flour",
        measurement: { amount: 500, unit: "g" }
      }
    },
    {
      input: "2 tbsp olive oil (+ extra for drizzling)",
      expected: {
        food: "olive oil",
        notes: "+ extra for drizzling",
        measurement: { amount: 2, unit: "tbsp" }
      }
    },
    {
      input: "2 tsp salt",
      expected: { food: "salt", measurement: { amount: 2, unit: "tsp" } }
    },
    {
      input: "2 sprigs rosemary",
      expected: { food: "rosemary", measurement: { amount: 2, unit: "sprig" } }
    },
    {
      input: "2 cloves garlic",
      expected: { food: "garlic", measurement: { amount: 2, unit: "clove" } }
    },
    {
      input: "2 pinches sea salt",
      expected: { food: "sea salt", measurement: { amount: 2, unit: "pinch" } }
    },
    {
      input: "1 red chilli",
      expected: { food: "red chilli", measurement: { amount: 1, unit: null } }
    },
    {
      input: "1 lemon",
      expected: { food: "lemon", measurement: { amount: 1, unit: null } }
    },
    {
      input: "2 peppercorns",
      expected: { food: "peppercorn", measurement: { amount: 2, unit: null } }
    },
    {
      input: "1 l olive oil",
      expected: { food: "olive oil", measurement: { amount: 1, unit: "l" } }
    },
    {
      input: "7 g dried yeast",
      expected: { food: "dried yeast", measurement: { amount: 7, unit: "g" } }
    },
    {
      input: "3/4 cup raw walnuts",
      expected: {
        food: "raw walnuts",
        measurement: { amount: 0.75, unit: "cup" }
      }
    },
    {
      input: "3/4 cup shredded parmesan cheese, divided",
      expected: {
        food: "shredded parmesan cheese",
        instruction: "divided",
        measurement: { amount: 0.75, unit: "cup" }
      }
    },
    {
      input: "2 tablespoons olive oil",
      expected: { food: "olive oil", measurement: { amount: 2, unit: "tbsp" } }
    },
    {
      input: "Salt and pepper to taste",
      expected: { food: "Salt and pepper to taste", measurement: null }
    },
    {
      input: "1 tablespoon butter",
      expected: { food: "butter", measurement: { amount: 1, unit: "tbsp" } }
    },
    {
      input: "1 shallot, thinly sliced",
      expected: {
        food: "shallot",
        instruction: "thinly sliced",
        measurement: { amount: 1, unit: null }
      }
    },
    {
      input: "1 pound Brussels sprouts, trimmed and thinly sliced",
      expected: {
        food: "Brussels sprouts",
        instruction: "trimmed and thinly sliced",
        measurement: { amount: 1, unit: "lb" }
      }
    },
    {
      input: "1 medium apple, cored and thinly sliced",
      expected: {
        food: "apple",
        instruction: "cored and thinly sliced",
        measurement: { amount: 1, unit: null, size: "medium" }
      }
    },
    {
      input: "1 tablespoon maple syrup",
      expected: {
        food: "maple syrup",
        measurement: { amount: 1, unit: "tbsp" }
      }
    },
    {
      input: "1 tablespoon chopped fresh thyme",
      expected: {
        food: "chopped fresh thyme",
        measurement: { amount: 1, unit: "tbsp" }
      }
    },
    {
      input: "2 puff pastry sheets, thawed according to package directions",
      expected: {
        food: "puff pastry sheet",
        instruction: "thawed according to package directions",
        measurement: { amount: 2, unit: null }
      }
    },
    {
      input: "2 tablespoons dried cranberries",
      expected: {
        food: "dried cranberries",
        measurement: { amount: 2, unit: "tbsp" }
      }
    },
    {
      input: "8 ounces parsnip, peeled and cut into chunks",
      expected: {
        food: "parsnip",
        instruction: "peeled and cut into chunks",
        measurement: { amount: 8, unit: "oz" }
      }
    },
    {
      input: "0.6kg potatoes, peeled and cut into chunks",
      expected: {
        food: "potatoes",
        instruction: "peeled and cut into chunks",
        measurement: { amount: 0.6, unit: "kg" }
      }
    },
    {
      input: "60ml olive oil, plus a drizzle to serve",
      expected: {
        food: "olive oil",
        instruction: "plus a drizzle to serve",
        measurement: { amount: 60, unit: "ml" }
      }
    },
    {
      input: "3 unpeeled garlic cloves",
      expected: {
        food: "unpeeled garlic",
        measurement: { amount: 3, unit: "clove" }
      }
    },
    {
      input: "1 tsp ground nutmeg (around 1 clove)",
      expected: {
        food: "ground nutmeg",
        notes: "around 1 clove",
        measurement: { amount: 1, unit: "tsp" }
      }
    },
    {
      input: "100g ‘00’ flour",
      expected: { food: "‘00’ flour", measurement: { amount: 100, unit: "g" } }
    },
    {
      input: "2 tbsp nutritional yeast",
      expected: {
        food: "nutritional yeast",
        measurement: { amount: 2, unit: "tbsp" }
      }
    },
    {
      input: "½ small pack thyme, leaves picked, to serve",
      expected: {
        food: "thyme",
        instruction: "leaves picked, to serve",
        measurement: { amount: 0.5, unit: "pack", size: "small" }
      }
    },
    {
      input: "a large handfull of walnuts, toasted and chopped, to serve",
      expected: {
        food: "walnuts",
        instruction: "toasted and chopped, to serve",
        measurement: { amount: 1, unit: "handfull", size: "large" }
      }
    }
  ].forEach(({ input, expected }) => {
    describe(`with the input "${input}"`, () => {
      const result = parseIngredient(input);

      it("should have an id", () => {
        expect(result.id).toBeTruthy();
      });

      it("should include the input as its rawText", () => {
        expect(result.rawText).toEqual(input);
      });

      it(`should set the food to "${expected.food}"`, () => {
        expect(result.food).toEqual(expected.food);
      });

      if (expected.measurement) {
        it(`should set the measurement amount to "${
          expected.measurement.amount
        }"`, () => {
          expect(result.measurement.amount).toEqual(
            expected.measurement.amount
          );
        });

        it(`should set the measurement unit to "${
          expected.measurement.unit
        }"`, () => {
          expect(result.measurement.unit).toEqual(expected.measurement.unit);
        });

        if (expected.measurement.size) {
          it(`should set the measurement size to "${
            expected.measurement.size
          }"`, () => {
            expect(result.measurement.size).toEqual(expected.measurement.size);
          });
        }
      } else {
        it(`should set the measurement to null`, () => {
          expect(result.measurement).toEqual(null);
        });
      }

      if (expected.instruction) {
        it(`should set the instruction to "${expected.instruction}"`, () => {
          expect(result.instruction).toEqual(expected.instruction);
        });
      }

      if (expected.notes) {
        it(`should set the notes to "${expected.notes}"`, () => {
          expect(result.notes).toEqual(expected.notes);
        });
      }
    });
  });
});
