import { APP_URL } from "./config/index.js";
import { buildChannel } from "./channel.js";
import { APP_LOADED } from "./appEventTypes.js";
import { setRecipeUrl } from "./actions";

const mockLocation = { href: "http://example.com" };

function buildMockWindow({ location: mockLocation } = {}) {
  let listener;
  return {
    location,
    postMessage: jest.fn(),
    addEventListener: (eventType, newListener) => {
      if (eventType !== "message") {
        throw new Error("Invalid event type");
      }
      listener = newListener;
    },
    removeEventListener: (eventType, newListener) => {
      if (eventType !== "message") {
        throw new Error("Invalid event type");
      }
      listener = undefined;
    },
    dispatchMockEvent: data => {
      listener({ data });
    }
  };
}

function buildMockCrossOriginLocation() {
  throw new Error(
    'Blocked a frame with origin "https:/example.com" from accessing a cross-origin frame.'
  );
}

async function buildStartedChannel() {
  const mockIframeWindow = buildMockWindow();
  const mockCurrentWindow = buildMockWindow();
  const buildingPromise = buildChannel({
    getIframeWindow: () => mockIframeWindow,
    currentWindow: mockCurrentWindow
  });
  mockCurrentWindow.dispatchMockEvent({ type: APP_LOADED });
  const channel = await buildingPromise;
  return { channel, mockCurrentWindow, mockIframeWindow };
}

describe("buildChannel", () => {
  describe("when the iframe cannot be found", () => {
    it("should throw an error", async () => {
      return expect(
        buildChannel({ getIframeWindow: () => null })
      ).rejects.toBeInstanceOf(Error);
    });
  });

  describe("when the app in the iframe has sent a loaded event", () => {
    it("should dispatch a message to the iframe window based on the current URL", async () => {
      const mockIframeWindow = buildMockWindow();
      const mockCurrentWindow = buildMockWindow();
      const buildingPromise = buildChannel({
        getIframeWindow: () => mockIframeWindow,
        currentWindow: mockCurrentWindow
      });
      mockCurrentWindow.dispatchMockEvent({ type: APP_LOADED });
      const channel = await buildingPromise;
      const action = setRecipeUrl(mockIframeWindow.location.href);
      expect(mockIframeWindow.postMessage).toHaveBeenCalledWith(
        action,
        APP_URL
      );
    });
  });

  describe("sendAction", () => {
    it("should send the action to the window. locking down the target url", async () => {
      const { channel, mockIframeWindow } = await buildStartedChannel();
      const action = { type: "MOCK_ACTION" };
      channel.sendAction(action);
      expect(mockIframeWindow.postMessage).toHaveBeenCalledWith(
        action,
        APP_URL
      );
    });
    describe("addListener", () => {
      describe("when a new message is sent through the channel to the extension", () => {
        it("should relay the message to the listeners", async () => {
          const { channel, mockCurrentWindow } = await buildStartedChannel();
          const listener = jest.fn();
          const message = { type: "MOCK_MESSAGE" };
          channel.addListener(listener);
          mockCurrentWindow.dispatchMockEvent(message);
          expect(listener).toHaveBeenCalledWith(message);
        });
      });
    });
  });
});
