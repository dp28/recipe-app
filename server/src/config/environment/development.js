function buildConfig(dependencyOverrides = {}) {
  const { execSync } = loadDependencies(dependencyOverrides);
  return {
    environment: "DEVELOPMENT",
    deployedAt: new Date(),
    version: execSync("git rev-parse HEAD", { encoding: "utf-8" })
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
