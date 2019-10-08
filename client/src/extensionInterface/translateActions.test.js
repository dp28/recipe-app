import {
  translateActionToMessage,
  translateMessageToActions,
  REQUEST_TEXT,
  REQUEST_TEXT_LIST,
  REGISTER_URL,
  TEXT_RESPONSE,
  TEXT_LIST_RESPONSE,
  RECIPE_APP_SOURCE
} from "./translateActions";
import {
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod,
  setRecipeUrl,
  setRecipeTitle,
  setRecipeServings,
  importRecipeIngredients,
  importRecipeMethod
} from "./actions";
import { loadRecipeByURL } from "../actions";

describe("translateActionToMessage", () => {
  describe("with an action that should not result in a message to the extension", () => {
    it("should return null", () => {
      expect(translateActionToMessage({ type: "FAKE" })).toEqual(null);
    });
  });

  describe("with a requestTitle action", () => {
    const message = translateActionToMessage(requestTitle());

    it("should return a message with the type 'REQUEST_TEXT'", () => {
      expect(message.type).toEqual(REQUEST_TEXT);
    });

    it("should return a message with the recipe app source", () => {
      expect(message.source).toEqual(RECIPE_APP_SOURCE);
    });
  });

  describe("with a requestServings action", () => {
    const message = translateActionToMessage(requestServings());

    it("should return a message with the type 'REQUEST_TEXT'", () => {
      expect(message.type).toEqual(REQUEST_TEXT);
    });

    it("should return a message with the recipe app source", () => {
      expect(message.source).toEqual(RECIPE_APP_SOURCE);
    });
  });

  describe("with a requestIngredients action", () => {
    const message = translateActionToMessage(requestIngredients());

    it("should return a message with the type 'REQUEST_TEXT_LIST'", () => {
      expect(message.type).toEqual(REQUEST_TEXT_LIST);
    });

    it("should return a message with the recipe app source", () => {
      expect(message.source).toEqual(RECIPE_APP_SOURCE);
    });
  });

  describe("with a requestMethod action", () => {
    const message = translateActionToMessage(requestMethod());

    it("should return a message with the type 'REQUEST_TEXT_LIST'", () => {
      expect(message.type).toEqual(REQUEST_TEXT_LIST);
    });

    it("should return a message with the recipe app source", () => {
      expect(message.source).toEqual(RECIPE_APP_SOURCE);
    });
  });
});

describe("translateMessageToActions", () => {
  describe("when the message is unknown", () => {
    it("should return an empty array", () => {
      expect(
        translateMessageToActions(
          { browserExtension: { currentStep: null } },
          { type: "FAKE" }
        )
      ).toEqual([]);
    });
  });

  describe("with a REGISTER_URL action", () => {
    it("should return a SET_RECIPE_URL action with the URL", () => {
      expect(
        translateMessageToActions(
          {},
          { type: REGISTER_URL, url: "https://example.com" }
        )
      ).toContainEqual(setRecipeUrl("https://example.com"));
    });
    it("should also return a LOAD_RECIPE_BY_URL action with the URL", () => {
      expect(
        translateMessageToActions(
          {},
          { type: REGISTER_URL, url: "https://example.com" }
        )
      ).toContainEqual(loadRecipeByURL("https://example.com"));
    });
  });

  describe("when the message is a 'TEXT_RESPONSE'", () => {
    describe("but no text is being waited for", () => {
      it("should return an empty array", () => {
        expect(
          translateMessageToActions(
            { browserExtension: { currentStep: null } },
            { type: TEXT_RESPONSE }
          )
        ).toEqual([]);
      });
    });

    describe("and the title is being waited for", () => {
      it("should return a 'SET_RECIPE_TITLE' action with the text", () => {
        const text = "bla";
        expect(
          translateMessageToActions(
            { browserExtension: { currentStep: "title" } },
            { type: TEXT_RESPONSE, text }
          )
        ).toEqual([setRecipeTitle(text)]);
      });
    });

    describe("and the servings are being waited for", () => {
      it("should return a 'SET_RECIPE_SERVINGS' action with the text", () => {
        const text = "bla";
        expect(
          translateMessageToActions(
            { browserExtension: { currentStep: "servings" } },
            { type: TEXT_RESPONSE, text }
          )
        ).toEqual([setRecipeServings(text)]);
      });
    });
  });

  describe("when the message is a 'TEXT_LIST_RESPONSE'", () => {
    describe("but no list is being waited for", () => {
      it("should return an empty array", () => {
        expect(
          translateMessageToActions(
            { browserExtension: { currentStep: null } },
            { type: TEXT_LIST_RESPONSE }
          )
        ).toEqual([]);
      });
    });

    describe("and the ingredients are being waited for", () => {
      it("should return a 'IMPORT_RECIPE_INGREDIENTS' action with the list", () => {
        const list = ["bla"];
        expect(
          translateMessageToActions(
            { browserExtension: { currentStep: "ingredients" } },
            { type: TEXT_LIST_RESPONSE, list }
          )
        ).toEqual([importRecipeIngredients(list)]);
      });
    });

    describe("and the method is being waited for", () => {
      it("should return a 'IMPORT_RECIPE_METHOD' action with the list", () => {
        const list = ["bla"];
        expect(
          translateMessageToActions(
            { browserExtension: { currentStep: "method" } },
            { type: TEXT_LIST_RESPONSE, list }
          )
        ).toEqual([importRecipeMethod(list)]);
      });
    });
  });
});
