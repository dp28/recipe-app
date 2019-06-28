function buildConfig(dependencyOverrides = {}) {
  const { readFileSync } = loadDependencies(dependencyOverrides);
  const contents = readFileSync("./deploymentStats.json", {
    encoding: "utf-8"
  });
  const { version, deployedAt } = JSON.parse(contents);
  return {
    environment: "PRODUCTION",
    version,
    deployedAt: new Date(Date.parse(deployedAt))
  };
}

function loadDependencies({ readFileSync }) {
  return {
    readFileSync: readFileSync || require("fs").readFileSync
  };
}

module.exports = {
  buildConfig
};
