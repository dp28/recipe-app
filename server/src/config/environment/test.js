const { DISABLED } = require("../../utils/logLevels");
const {
  HardcodedURIRepository
} = require("../../storage/databaseURIRepositories/hardcodedURIRepository");

module.exports = {
  buildConfig: () => ({
    environment: "TEST",
    logLevel: DISABLED,
    deployedAt: new Date(),
    version: "test",
    mongoURIRepository: new HardcodedURIRepository({
      uri: "mongodb://127.0.0.1:27017/test"
    })
  })
};
