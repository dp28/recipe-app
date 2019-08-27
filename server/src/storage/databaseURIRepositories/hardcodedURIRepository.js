class HardcodedURIRepository {
  constructor({ uri }) {
    if (!uri) throw new Error("URI required");
    this.uri = uri;
  }

  async get() {
    return this.uri;
  }
}

module.exports = { HardcodedURIRepository };
