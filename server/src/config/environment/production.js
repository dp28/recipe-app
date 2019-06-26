function buildConfig(dependencyOverrides = {}) {
  const { fs } = loadDependencies(dependencyOverrides);
  return {
    environment: "PRODUCTION",
    deployedAt: fs.statSync(".current_version").mtime
  };
}

function loadDependencies({ fs }) {
  return {
    fs: fs || require("fs")
  };
}

module.exports = {
  buildConfig
};
