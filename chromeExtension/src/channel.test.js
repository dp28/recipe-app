import { APP_URL } from "./config/index.js";
import { buildChannel } from "./channel.js";
import { APP_LOADED } from "./appEventTypes.js";
import { identifyRecipeUrl } from "./actions";

const mockLocation = { href: "http://example.com" };

function buildMockWindow() {
  let listener;
  return {
    postMessage: jest.fn(),
    addEventListener: (eventType, newListener) => {
      if (eventType !== "message") {
        throw new Error("Invalid event type");
      }
      listener = newListener;
    },
    dispatchMockEvent: event => {
      listener(event);
    }
  };
}

function buildStartedChannel() {
  const mockWindow = buildMockWindow();
  const channel = buildChannel({
    getIframeWindow: () => mockWindow
  });
  mockWindow.dispatchMockEvent({ type: APP_LOADED });
  return { channel, mockWindow };
}

describe("buildChannel", () => {
  describe("when the iframe cannot be found", () => {
    it("should throw an error", () => {
      expect(() =>
        buildChannel({
          getIframeWindow: () => null
        })
      ).toThrow(Error);
    });
  });

  it("should dispatch a message to the iframe window based on the current URL", () => {
    const mockWindow = buildMockWindow();
    const channel = buildChannel({
      getIframeWindow: () => mockWindow,
      location: mockLocation
    });
    const action = identifyRecipeUrl(mockLocation.href);
    expect(mockWindow.postMessage).toHaveBeenCalledWith(action, APP_URL);
  });

  describe("sendAction", () => {
    describe("when the started message has not yet been received", () => {
      it("should throw an error", () => {
        const channel = buildChannel({
          getIframeWindow: buildMockWindow
        });
        expect(() => channel.sendAction({})).toThrow(Error);
      });
    });

    describe("when the started message has been received", () => {
      it("should send the action to the window. locking down the target url", () => {
        const mockWindow = buildMockWindow();
        const channel = buildChannel({
          getIframeWindow: () => mockWindow
        });

        mockWindow.dispatchMockEvent({ type: APP_LOADED });

        const action = { type: "MOCK_ACTION" };
        channel.sendAction(action);
        expect(mockWindow.postMessage).toHaveBeenCalledWith(action, APP_URL);
      });
    });
  });

  describe("addListener", () => {
    describe("when a new message is sent through the channel to the extension", () => {
      it("should relay the message to the listeners", () => {
        const { channel, mockWindow } = buildStartedChannel();
        const listener = jest.fn();
        const message = { type: "MOCK_MESSAGE" };
        channel.addListener(listener);
        mockWindow.dispatchMockEvent(message);
        expect(listener).toHaveBeenCalledWith(message);
      });
    });
  });
});
