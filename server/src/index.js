const { server } = require("./graphql/graphqlServer");

module.exports = { handler: server.createHandler({ cors: { origin: "*" } }) };
