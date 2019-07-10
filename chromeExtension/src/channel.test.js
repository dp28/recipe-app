import { APP_URL } from "./config/index.js";
import { buildChannel } from "./channel.js";
import { APP_LOADED } from "./appEventTypes.js";
import { identifyRecipeUrl } from "./actions";

const mockLocation = { href: "http://example.com" };

function buildMockWindow({
  buildMockLocation = buildMockCrossOriginLocation
} = {}) {
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
    },
    get location() {
      return buildMockLocation ? buildMockLocation() : {};
    }
  };
}

function buildMockCrossOriginLocation() {
  throw new Error(
    'Blocked a frame with origin "https:/example.com" from accessing a cross-origin frame.'
  );
}

async function buildStartedChannel() {
  const mockWindow = buildMockWindow();
  const channel = await buildChannel({
    getIframeWindow: () => mockWindow
  });
  mockWindow.dispatchMockEvent({ type: APP_LOADED });
  return { channel, mockWindow };
}

describe("buildChannel", () => {
  describe("when the iframe cannot be found", () => {
    it("should throw an error", async () => {
      return expect(
        buildChannel({ getIframeWindow: () => null })
      ).rejects.toBeInstanceOf(Error);
    });
  });

  describe("when the iframe has loaded a cross-origin URL", () => {
    it("should dispatch a message to the iframe window based on the current URL", async () => {
      const mockWindow = buildMockWindow({
        buildMockLocation: buildMockCrossOriginLocation
      });
      const channel = await buildChannel({
        getIframeWindow: () => mockWindow,
        location: mockLocation
      });
      const action = identifyRecipeUrl(mockLocation.href);
      expect(mockWindow.postMessage).toHaveBeenCalledWith(action, APP_URL);
    });
  });

  describe("sendAction", () => {
    describe("when the started message has not yet been received", () => {
      it("should throw an error", async () => {
        const channel = await buildChannel({
          getIframeWindow: buildMockWindow
        });
        expect(() => channel.sendAction({})).toThrow(Error);
      });
    });

    describe("when the started message has been received", () => {
      it("should send the action to the window. locking down the target url", async () => {
        const mockWindow = buildMockWindow();
        const channel = await buildChannel({
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
      it("should relay the message to the listeners", async () => {
        const { channel, mockWindow } = await buildStartedChannel();
        const listener = jest.fn();
        const message = { type: "MOCK_MESSAGE" };
        channel.addListener(listener);
        mockWindow.dispatchMockEvent(message);
        expect(listener).toHaveBeenCalledWith(message);
      });
    });
  });
});
