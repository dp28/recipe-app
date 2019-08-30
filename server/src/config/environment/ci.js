const { DISABLED } = require("../../utils/logLevels");
const {
  HardcodedURIRepository
} = require("../../storage/databaseURIRepositories/hardcodedURIRepository");

module.exports = {
  buildConfig: () => ({
    environment: "CI",
    logLevel: DISABLED,
    deployedAt: new Date(),
    version: "test-ci",
    mongoURIRepository: new HardcodedURIRepository({
      uri: "mongodb://localhost:27017/test"
    })
  })
};
