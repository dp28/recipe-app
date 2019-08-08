import {
  translateActionToMessage,
  translateMessageToAction,
  REQUEST_TEXT,
  TEXT_RESPONSE,
  RECIPE_APP_SOURCE
} from "./translateActions";
import {
  requestTitle,
  requestServings,
  setRecipeTitle,
  setRecipeServings
} from "../actions";

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
});

describe("translateMessageToAction", () => {
  describe("when the message is unknown", () => {
    it("should return null", () => {
      expect(translateMessageToAction({}, { type: "FAKE" })).toEqual(null);
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
});
