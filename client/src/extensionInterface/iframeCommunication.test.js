import {
  enableIframeCommunication,
  handleExtensionMessage,
  iframeCommunicationReduxMiddleware
} from "./iframeCommunication";
import { appLoaded } from "./actions";

function buildMockStore({ state = {} } = {}) {
  return {
    getState: jest.fn(() => state),
    dispatch: jest.fn()
  };
}

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
  it("should send the message data and store state to the transform function", () => {
    const state = { a: 1 };
    const store = buildMockStore({ state });
    const transform = jest.fn();
    const data = { b: 2 };
    handleExtensionMessage(store, transform)({ data });
    expect(transform).toHaveBeenCalledWith(state, data);
  });

  describe("if the message is transformed to null", () => {
    it("should not dispatch anything to the store", () => {
      const store = buildMockStore();
      handleExtensionMessage(store, () => null)({ data: {} });
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe("if the message is transformed to an action", () => {
    it("should dispatch the transformed action to the store", () => {
      const action = {
        type: "FAKE"
      };
      const store = buildMockStore();
      handleExtensionMessage(store, () => action)({ data: {} });
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});

describe("iframeCommunicationReduxMiddleware", () => {
  it("should call next with the action", () => {
    const next = jest.fn();
    const action = { type: "FAKE_ACTION" };
    iframeCommunicationReduxMiddleware(() => null, { parent: {} })({})(next)(
      action
    );
    expect(next).toHaveBeenCalledWith(action);
  });

  describe("when the transform function returns null for the action", () => {
    it("should not send a message to the parent window", () => {
      const mockWindow = {
        parent: { postMessage: jest.fn() }
      };
      iframeCommunicationReduxMiddleware(() => null, mockWindow)({})(jest.fn())(
        {
          type: "FAKE_ACTION"
        }
      );
      expect(mockWindow.parent.postMessage).not.toHaveBeenCalled();
    });
  });

  describe("when the transform function returns an object", () => {
    const action = { type: "FAKE_ACTION" };
    const transform = () => action;

    it("should send the object to the parent window", () => {
      const mockWindow = {
        location: { href: "fake" },
        parent: { postMessage: jest.fn(), location: { href: "other" } }
      };
      iframeCommunicationReduxMiddleware(transform, mockWindow)({})(jest.fn())(
        action
      );
      expect(mockWindow.parent.postMessage).toHaveBeenCalledWith(action, "*");
    });

    describe("when not in an iframe", () => {
      it("should not send a message to the parent window", () => {
        const location = { href: "fake" };
        const mockWindow = {
          location,
          parent: { postMessage: jest.fn(), location }
        };
        iframeCommunicationReduxMiddleware(transform, mockWindow)({})(
          jest.fn()
        )(action);
        expect(mockWindow.parent.postMessage).not.toHaveBeenCalled();
      });
    });
  });
});
