import {
  translateActionToMessage,
  translateMessageToAction,
  REQUEST_TEXT,
  REQUEST_TEXT_LIST,
  TEXT_RESPONSE,
  TEXT_LIST_RESPONSE,
  RECIPE_APP_SOURCE
} from "./translateActions";
import {
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod,
  setRecipeTitle,
  setRecipeServings,
  importRecipeIngredients,
  importRecipeMethod
} from "./actions";

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

describe("translateMessageToAction", () => {
  describe("when the message is unknown", () => {
    it("should return null", () => {
      expect(
        translateMessageToAction(
          { browserExtension: { waitingFor: null } },
          { type: "FAKE" }
        )
      ).toEqual(null);
    });
  });

  describe("when the message is a 'TEXT_RESPONSE'", () => {
    describe("but no text is being waited for", () => {
      it("should return null", () => {
        expect(
          translateMessageToAction(
            { browserExtension: { waitingFor: null } },
            { type: TEXT_RESPONSE }
          )
        ).toEqual(null);
      });
    });

    describe("and the title is being waited for", () => {
      it("should return a 'SET_RECIPE_TITLE' action with the text", () => {
        const text = "bla";
        expect(
          translateMessageToAction(
            { browserExtension: { waitingFor: "title" } },
            { type: TEXT_RESPONSE, text }
          )
        ).toEqual(setRecipeTitle(text));
      });
    });

    describe("and the servings are being waited for", () => {
      it("should return a 'SET_RECIPE_SERVINGS' action with the text", () => {
        const text = "bla";
        expect(
          translateMessageToAction(
            { browserExtension: { waitingFor: "servings" } },
            { type: TEXT_RESPONSE, text }
          )
        ).toEqual(setRecipeServings(text));
      });
    });
  });

  describe("when the message is a 'TEXT_LIST_RESPONSE'", () => {
    describe("but no list is being waited for", () => {
      it("should return null", () => {
        expect(
          translateMessageToAction(
            { browserExtension: { waitingFor: null } },
            { type: TEXT_LIST_RESPONSE }
          )
        ).toEqual(null);
      });
    });

    describe("and the ingredients are being waited for", () => {
      it("should return a 'IMPORT_RECIPE_INGREDIENTS' action with the list", () => {
        const list = ["bla"];
        expect(
          translateMessageToAction(
            { browserExtension: { waitingFor: "ingredients" } },
            { type: TEXT_LIST_RESPONSE, list }
          )
        ).toEqual(importRecipeIngredients(list));
      });
    });

    describe("and the method is being waited for", () => {
      it("should return a 'IMPORT_RECIPE_METHOD' action with the list", () => {
        const list = ["bla"];
        expect(
          translateMessageToAction(
            { browserExtension: { waitingFor: "method" } },
            { type: TEXT_LIST_RESPONSE, list }
          )
        ).toEqual(importRecipeMethod(list));
      });
    });
  });
});
