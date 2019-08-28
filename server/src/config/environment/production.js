const {
  HerokuMongoURIRepository
} = require("../../storage/databaseURIRepositories/herokuMongoURIRepository");

function buildConfig(dependencyOverrides = {}) {
  const { readFileSync, environment } = loadDependencies(dependencyOverrides);
  const contents = readFileSync("./deploymentStats.json", {
    encoding: "utf-8"
  });
  const { version, deployedAt } = JSON.parse(contents);
  return {
    environment: "PRODUCTION",
    version,
    deployedAt: new Date(Date.parse(deployedAt)),
    mongoURIRepository: new HerokuMongoURIRepository({
      apiKey: environment.HEROKU_API_KEY,
      mongoAddonId: environment.HEROKU_MONGO_ADDON_ID
    })
  };
}

function loadDependencies({ readFileSync, environment }) {
  return {
    readFileSync: readFileSync || require("fs").readFileSync,
    environment: environment || process.env
  };
}

module.exports = {
  buildConfig
};
