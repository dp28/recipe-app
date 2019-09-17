import { parseMethod } from "./method";

describe("parseMethod", () => {
  const risotto = {
    input: {
      url:
        "https://www.jamieoliver.com/recipes/rice-recipes/pea-and-goat-s-cheese-risotto/",
      ingredients: [
        {
          id: "cjzmlvdyp0000305sc9ppd8hs",
          rawText: "1 litre organic chicken or vegetable stock",
          measurement: {
            amount: 1,
            unit: "l"
          },
          food: {
            name: "chicken or vegetable stock"
          }
        },
        {
          id: "cjzmlvdyu0001305skbcdmkdd",
          rawText: "25 g butter",
          measurement: {
            amount: 25,
            unit: "g"
          },
          food: {
            name: "butter"
          }
        },
        {
          id: "cjzmlvdyx0002305sc6e3licg",
          rawText: "½ onion , finely chopped",
          measurement: {
            amount: 0.5,
            unit: null,
            size: ""
          },
          instruction: "finely chopped",
          food: {
            name: "onion"
          }
        },
        {
          id: "cjzmlvdz20003305sd84yq9ie",
          rawText: "100 g higher-welfare streaky bacon , cut into matchsticks",
          measurement: {
            amount: 100,
            unit: "g"
          },
          instruction: "cut into matchsticks",
          food: {
            name: "higher-welfare streaky bacon"
          }
        },
        {
          id: "cjzmlvdz70004305sf8io0zfd",
          rawText: "1 bunch fresh thyme",
          measurement: {
            amount: 1,
            unit: "bunch",
            size: ""
          },
          food: {
            name: "fresh thyme"
          }
        },
        {
          id: "cjzmlvdze0005305simyr3oem",
          rawText: "400 g risotto rice",
          measurement: {
            amount: 400,
            unit: "g"
          },
          food: {
            name: "risotto rice"
          }
        },
        {
          id: "cjzmlvdzk0006305sd2z2027e",
          rawText: "150 ml white wine",
          measurement: {
            amount: 150,
            unit: "ml"
          },
          food: {
            name: "white wine"
          }
        },
        {
          id: "cjzmlvdzq0007305sinn0b74e",
          rawText: "200 g frozen peas",
          measurement: {
            amount: 200,
            unit: "g"
          },
          food: {
            name: "frozen peas"
          }
        },
        {
          id: "cjzmlvdzs0008305sohmy49nq",
          rawText: "sea salt",
          measurement: null,
          food: {
            name: "sea salt"
          }
        },
        {
          id: "cjzmlvdzv0009305sg860bawx",
          rawText: "freshly ground black pepper",
          measurement: null,
          food: {
            name: "freshly ground black pepper"
          }
        },
        {
          id: "cjzmlvdzz000a305srxkbq58d",
          rawText: "100 g crumbly goat's cheese",
          measurement: {
            amount: 100,
            unit: "g"
          },
          food: {
            name: "crumbly goat's cheese"
          }
        },
        {
          id: "cjzmlve04000b305sxq01x3x7",
          rawText: "75 g Parmesan cheese , freshly grated",
          measurement: {
            amount: 75,
            unit: "g"
          },
          instruction: "freshly grated",
          food: {
            name: "parmesan cheese"
          }
        }
      ],
      steps: [
        "A classic Italian dish that's hard to beat.",
        "Heat the stock in a saucepan. In a separate pan, heat the butter, then add the onion, bacon and thyme and fry for about 8 minutes until the onion is soft but not coloured. Add the rice and turn up the heat so it almost fries.",
        "After a minute the rice will look slightly translucent. Add the wine and keep stirring.",
        "Now add a ladle of hot stock and a pinch of salt. Turn down the heat to a fairly high simmer. Keep adding ladlefuls of stock, stirring constantly and allowing each ladleful to be absorbed completely before adding the next.",
        "Chuck the peas into the stock when there are a couple of ladlefuls left, and add them with the stock. Stir until the rice is soft but still has a slight bite, then season with salt and pepper.",
        "Remove from the heat and stir in half the goat's cheese and the Parmesan. Sprinkle the remaining goat's cheese over the top and eat as soon as possible while it retains its lovely moist texture.",
        "Tip: Leave out the bacon and use vegetable stock if you want to make a vegetarian risotto."
      ]
    },
    expected: {
      steps: [
        {
          rawText: "A classic Italian dish that's hard to beat.",
          ingredientIds: [],
          timers: []
        },
        {
          rawText:
            "Heat the stock in a saucepan. In a separate pan, heat the butter, then add the onion, bacon and thyme and fry for about 8 minutes until the onion is soft but not coloured. Add the rice and turn up the heat so it almost fries.",
          ingredientIds: [
            "cjzmlvdyp0000305sc9ppd8hs",
            "cjzmlvdyu0001305skbcdmkdd",
            "cjzmlvdyx0002305sc6e3licg",
            "cjzmlvdz20003305sd84yq9ie",
            "cjzmlvdz70004305sf8io0zfd",
            "cjzmlvdze0005305simyr3oem"
          ],
          timers: [{ seconds: 8 * 60 }]
        },
        {
          rawText:
            "After a minute the rice will look slightly translucent. Add the wine and keep stirring.",
          ingredientIds: ["cjzmlvdzk0006305sd2z2027e"],
          timers: []
        },
        {
          rawText:
            "Now add a ladle of hot stock and a pinch of salt. Turn down the heat to a fairly high simmer. Keep adding ladlefuls of stock, stirring constantly and allowing each ladleful to be absorbed completely before adding the next.",
          ingredientIds: ["cjzmlvdzs0008305sohmy49nq"],
          timers: []
        },
        {
          rawText:
            "Chuck the peas into the stock when there are a couple of ladlefuls left, and add them with the stock. Stir until the rice is soft but still has a slight bite, then season with salt and pepper.",
          ingredientIds: [
            "cjzmlvdzq0007305sinn0b74e",
            "cjzmlvdzv0009305sg860bawx"
          ],
          timers: []
        },
        {
          rawText:
            "Remove from the heat and stir in half the goat's cheese and the Parmesan. Sprinkle the remaining goat's cheese over the top and eat as soon as possible while it retains its lovely moist texture.",
          ingredientIds: [
            "cjzmlvdzz000a305srxkbq58d",
            "cjzmlve04000b305sxq01x3x7"
          ],
          timers: []
        },
        {
          rawText:
            "Tip: Leave out the bacon and use vegetable stock if you want to make a vegetarian risotto.",
          ingredientIds: [],
          timers: []
        }
      ]
    }
  };

  const tart = {
    input: {
      url:
        "https://ohmyveggies.com/recipe-brussels-sprout-apple-tart-walnut-pesto/",
      ingredients: [
        {
          id: "cjznbxyia0000305s2enh7rbd",
          rawText: "3/4 cup raw walnuts",
          measurement: {
            amount: 0.75,
            unit: "cup"
          },
          instruction: "",
          food: {
            name: "raw walnuts"
          }
        },
        {
          id: "cjznbxyii0001305s3qljs27p",
          rawText: "3/4 cup shredded parmesan cheese, divided",
          measurement: {
            amount: 0.75,
            unit: "cup"
          },
          instruction: "divided",
          food: {
            name: "shredded parmesan cheese"
          }
        },
        {
          id: "cjznbxyir0002305s550ua4qe",
          rawText: "2 tablespoons olive oil",
          measurement: {
            amount: 2,
            unit: "tbsp"
          },
          instruction: "",
          food: {
            name: "olive oil"
          }
        },
        {
          id: "cjznbxyiw0003305swcu2v4ec",
          rawText: "Salt and pepper to taste",
          measurement: null,
          instruction: "",
          food: {
            name: "salt and pepper to taste"
          }
        },
        {
          id: "cjznbxyj10004305s0pwitu32",
          rawText: "1 tablespoon butter",
          measurement: {
            amount: 1,
            unit: "tbsp"
          },
          instruction: "",
          food: {
            name: "butter"
          }
        },
        {
          id: "cjznbxyj40005305seqteytux",
          rawText: "1 shallot, thinly sliced",
          measurement: {
            amount: 1,
            unit: null,
            size: ""
          },
          instruction: "thinly sliced",
          food: {
            name: "shallot"
          }
        },
        {
          id: "cjznbxyj90006305sz9a07lx9",
          rawText: "1 pound Brussels sprouts, trimmed and thinly sliced",
          measurement: {
            amount: 1,
            unit: "lb"
          },
          instruction: "trimmed and thinly sliced",
          food: {
            name: "Brussels sprouts"
          }
        },
        {
          id: "cjznbxyjf0007305serap1iob",
          rawText: "1 medium apple, cored and thinly sliced",
          measurement: {
            amount: 1,
            unit: null,
            size: "medium"
          },
          instruction: "cored and thinly sliced",
          food: {
            name: "apple"
          }
        },
        {
          id: "cjznbxyji0008305sau93ejsi",
          rawText: "1 tablespoon maple syrup",
          measurement: {
            amount: 1,
            unit: "tbsp"
          },
          instruction: "",
          food: {
            name: "maple syrup"
          }
        },
        {
          id: "cjznbxyjo0009305snzo0lrg7",
          rawText: "1 tablespoon chopped fresh thyme",
          measurement: {
            amount: 1,
            unit: "tbsp"
          },
          instruction: "",
          food: {
            name: "chopped fresh thyme"
          }
        },
        {
          id: "cjznbxyjs000a305sieasav3h",
          rawText:
            "2 puff pastry sheets, thawed according to package directions",
          measurement: {
            amount: 2,
            unit: null,
            size: ""
          },
          instruction: "thawed according to package directions",
          food: {
            name: "puff pastry sheet"
          }
        },
        {
          id: "cjznbxyjw000b305semm1pmdw",
          rawText: "2 tablespoons dried cranberries",
          measurement: {
            amount: 2,
            unit: "tbsp"
          },
          instruction: "",
          food: {
            name: "dried cranberries"
          }
        }
      ],
      steps: [
        "Preheat oven to 425ºF.",
        "Put the walnuts, 1/4 cup of cheese, and olive oil in a food processor and process until crumbly. Season with salt and pepper.",
        "Heat the butter in a large skillet over medium heat. Add the shallot and cook for about 5 minutes, until softened. Stir in the Brussels sprouts and apple slices; cook about 10 minutes more, or until apples and sprouts are beginning to brown. Stir in the maple syrup and thyme, then remove from heat and season to taste with salt and pepper.",
        "Place the puff pastry on baking sheets lined with Silpats or parchment paper; roll the pastry out to about 9 x 12 inches. Bake for 8-10 minutes, or until the pastry is puffed and golden brown. Gently press down the center of the pastry, leaving a 1-inch margin on all sides. Sprinkle the pesto onto the crust, then top with half the cheese, the sprouts and apples, then the remaining cheese. (You might have some of the sprout mixture leftover.) Return to the oven for 5 more minutes to melt the cheese, then top with the cranberries. Leave to cool for half an hour. Cut each tart into 6 pieces and serve."
      ]
    },
    expected: {
      steps: [
        {
          rawText: "Preheat oven to 425ºF.",
          ingredientIds: [],
          timers: []
        },
        {
          rawText:
            "Put the walnuts, 1/4 cup of cheese, and olive oil in a food processor and process until crumbly. Season with salt and pepper.",
          ingredientIds: [
            "cjznbxyia0000305s2enh7rbd",
            "cjznbxyii0001305s3qljs27p",
            "cjznbxyir0002305s550ua4qe",
            "cjznbxyiw0003305swcu2v4ec"
          ],
          timers: []
        },
        {
          rawText:
            "Heat the butter in a large skillet over medium heat. Add the shallot and cook for about 5 minutes, until softened. Stir in the Brussels sprouts and apple slices; cook about 10 minutes more, or until apples and sprouts are beginning to brown. Stir in the maple syrup and thyme, then remove from heat and season to taste with salt and pepper.",
          ingredientIds: [
            "cjznbxyj10004305s0pwitu32",
            "cjznbxyj40005305seqteytux",
            "cjznbxyj90006305sz9a07lx9",
            "cjznbxyjf0007305serap1iob",
            "cjznbxyji0008305sau93ejsi",
            "cjznbxyjo0009305snzo0lrg7"
          ],
          timers: [{ seconds: 5 * 60 }, { seconds: 10 * 60 }]
        },
        {
          rawText:
            "Place the puff pastry on baking sheets lined with Silpats or parchment paper; roll the pastry out to about 9 x 12 inches. Bake for 8-10 minutes, or until the pastry is puffed and golden brown. Gently press down the center of the pastry, leaving a 1-inch margin on all sides. Sprinkle the pesto onto the crust, then top with half the cheese, the sprouts and apples, then the remaining cheese. (You might have some of the sprout mixture leftover.) Return to the oven for 5 more minutes to melt the cheese, then top with the cranberries. Leave to cool for half an hour. Cut each tart into 6 pieces and serve.",
          ingredientIds: [
            "cjznbxyjs000a305sieasav3h",
            "cjznbxyjw000b305semm1pmdw"
          ],
          timers: [
            { seconds: 10 * 60 },
            { seconds: 5 * 60 },
            { seconds: 0.5 * 60 * 60 }
          ]
        }
      ]
    }
  };

  [risotto, tart].forEach(({ input, expected }) => {
    describe(`with the recipe from "${input.url}"`, () => {
      const result = parseMethod({
        ingredients: input.ingredients,
        steps: input.steps
      });

      it("should have an id", () => {
        expect(result.id).toBeTruthy();
      });

      expected.steps.forEach((expectedStep, index) => {
        const resultStep = result.steps[index];
        const inputStep = input.steps[index];

        describe(`the instruction at index ${index}`, () => {
          it("should have an id", () => {
            expect(resultStep.id).toBeTruthy();
          });

          it(`should have the ordering ${index + 1}`, () => {
            expect(resultStep.ordering).toEqual(index + 1);
          });

          it("should have the correct rawText", () => {
            expect(resultStep.rawText).toEqual(inputStep);
          });

          const ingredientCount = expectedStep.ingredientIds.length;

          it(`should link to the ${ingredientCount} ingredients specified`, () => {
            expect(resultStep.ingredientIds).toEqual(
              expectedStep.ingredientIds
            );
          });

          it(`should have ${expectedStep.timers.length} timers`, () => {
            expect(resultStep.timers.length).toEqual(
              expectedStep.timers.length
            );
          });

          expectedStep.timers.forEach((extpectedTimer, i) => {
            const resultTimer = resultStep.timers[i];

            describe(`the timer at index ${i}`, () => {
              it(`should be for ${extpectedTimer.seconds} seconds`, () => {
                expect(resultTimer.seconds).toEqual(extpectedTimer.seconds);
              });

              it(`should have an id`, () => {
                expect(resultTimer.id).toBeTruthy();
              });
            });
          });
        });
      });
    });
  });
});
