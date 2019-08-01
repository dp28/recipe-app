import {
  enableIframeCommunication,
  handleExtensionMessage
} from "./iframeCommunication";

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
        {
          type: "APP_LOADED",
          source: "RECIPE_APP"
        },
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
