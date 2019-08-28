const {
  HardcodedURIRepository
} = require("../../storage/databaseURIRepositories/hardcodedURIRepository");

function buildConfig(dependencyOverrides = {}) {
  const { execSync } = loadDependencies(dependencyOverrides);
  return {
    environment: "DEVELOPMENT",
    deployedAt: new Date(),
    version: execSync("git rev-parse HEAD", { encoding: "utf-8" }),
    mongoURIRepository: new HardcodedURIRepository({
      uri: "mongodb://127.0.0.1:27017/development"
    })
  };
}

function loadDependencies({ execSync }) {
  return {
    execSync: execSync || require("child_process").execSync
  };
}

module.exports = {
  buildConfig
};
