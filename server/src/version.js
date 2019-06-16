const { promisify } = require("util");
const childProcess = require("child_process");
const fs = require("fs");

async function getCurrentVersion({
  exec = childProcess.exec,
  readFile = fs.readFile
} = {}) {
  try {
    const result = await promisify(exec)("git rev-parse HEAD");
    return result.stdout.replace("\n", "");
  } catch {
    const result = await promisify(readFile)(".current_version", {
      encoding: "utf-8"
    });
    return result.replace("\n", "");
  }
}

module.exports = {
  getCurrentVersion
};
