const { getCurrentVersionUnmemoized: getCurrentVersion } = require("./version");

describe("getCurrentVersion", () => {
  describe("when git is available", () => {
    it("should return the current git SHA", async () => {
      const gitSHA = "somesha";
      const exec = async (_, callback) => {
        callback(null, { stdout: `${gitSHA}\n` });
      };
      expect(await getCurrentVersion({ exec })).toEqual(gitSHA);
    });
  });

  describe("when git is not available", () => {
    const execFail = async (_, callback) => {
      callback(new Error());
    };
    it("should fall back to the .current_version file", async () => {
      const gitSHA = "someothersha";
      const readFile = async (_file, _options, callback) => {
        callback(null, gitSHA);
      };
      expect(await getCurrentVersion({ exec: execFail, readFile })).toEqual(
        gitSHA
      );
    });
  });
});
