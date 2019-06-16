const { server } = require("./graphqlServer");

module.exports = { handler: server.createHandler() };
