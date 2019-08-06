import {
  enableIframeCommunication,
  handleExtensionMessage,
  iframeCommunicationReduxMiddleware
} from "./iframeCommunication";
import { appLoaded } from "../actions";

describe("enableIframeCommunication", () => {
  describe("when the window is the parent", () => {
    it("should not add any event listeners", () => {
      const location = { href: "fake" };
      const mockWindow = {
        location,
        parent: { location },
        addEventListener: jest.fn()
      };
      enableIframeCommunication(mockWindow);
      expect(mockWindow.addEventListener).not.toHaveBeenCalled();
    });
  });

  describe("when the window is not the parent", () => {
    it("should add an event listener", () => {
      const mockWindow = {
        location: { href: "fake" },
        parent: { location: { href: "other_fake" }, postMessage: jest.fn() },
        addEventListener: jest.fn()
      };
      enableIframeCommunication(mockWindow);
      expect(mockWindow.addEventListener).toHaveBeenCalledWith(
        "message",
        expect.any(Function)
      );
    });
    it("should post a loaded message to the extension", () => {
      const mockWindow = {
        location: { href: "fake" },
        parent: { location: { href: "other_fake" }, postMessage: jest.fn() },
        addEventListener: jest.fn()
      };
      enableIframeCommunication(mockWindow);
      expect(mockWindow.parent.postMessage).toHaveBeenCalledWith(
        appLoaded(),
        "*"
      );
    });
  });
});

describe("handleExtensionMessage", () => {
  describe("if the message is not from the browser extension", () => {
    it("should not dispatch anything to the store", () => {
      const dispatch = jest.fn();
      handleExtensionMessage(dispatch)({ data: { type: "FAKE" } });
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe("if the message is from the browser extension", () => {
    it("should dispatch the data payload to the store", () => {
      const dispatch = jest.fn();
      const data = {
        type: "FAKE",
        source: "RECIPE_CHROME_EXTENSION"
      };
      handleExtensionMessage(dispatch)({ data });
      expect(dispatch).toHaveBeenCalledWith(data);
    });
  });
});

describe("iframeCommunicationReduxMiddleware", () => {
  it("should call next with the action", () => {
    const next = jest.fn();
    const action = { type: "FAKE_ACTION" };
    iframeCommunicationReduxMiddleware({ parent: {} })({})(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  describe("when a normal action is passed", () => {
    it("should not send a message to the parent window", () => {
      const mockWindow = {
        parent: { postMessage: jest.fn() }
      };
      iframeCommunicationReduxMiddleware(mockWindow)({})(jest.fn())({
        type: "FAKE_ACTION"
      });
      expect(mockWindow.parent.postMessage).not.toHaveBeenCalled();
    });
  });

  describe("when an action has a destination of BROWSER_EXTENSION", () => {
    const action = {
      type: "FAKE_ACTION",
      destination: "BROWSER_EXTENSION"
    };

    it("should send the action to the parent window", () => {
      const mockWindow = {
        location: { href: "fake" },
        parent: { postMessage: jest.fn(), location: { href: "other" } }
      };
      iframeCommunicationReduxMiddleware(mockWindow)({})(jest.fn())(action);
      expect(mockWindow.parent.postMessage).toHaveBeenCalledWith(action, "*");
    });

    describe("when not in an iframe", () => {
      it("should not send a message to the parent window", () => {
        const location = { href: "fake" };
        const mockWindow = {
          location,
          parent: { postMessage: jest.fn(), location }
        };
        iframeCommunicationReduxMiddleware(mockWindow)({})(jest.fn())(action);
        expect(mockWindow.parent.postMessage).not.toHaveBeenCalled();
      });
    });
  });
});
