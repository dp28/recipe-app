const { MongoClient } = require("mongodb");
const { mongoURIRepository, environment } = require("../config");

async function withMongoConnection(callback) {
  const mongoURI = await mongoURIRepository.get();
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();
  const db = client.db();
  try {
    return callback(db);
  } finally {
    client.close();
  }
}

async function saveEvent(event) {
  return withMongoConnection(db =>
    db.collection("events").insertOne(mapEventToMongoFormat(event))
  );
}

async function deleteAllEvents() {
  if (environment !== "TEST") {
    throw new Error(
      "Don't delete all the data! (Only allowed in TEST environment)"
    );
  }
  return withMongoConnection(db => db.collection("events").deleteMany({}));
}

function mapEventToMongoFormat({ id, type, occurredAt, payload }) {
  return {
    _id: id,
    type,
    occurredAt,
    payload
  };
}

module.exports = { saveEvent, withMongoConnection, deleteAllEvents };
