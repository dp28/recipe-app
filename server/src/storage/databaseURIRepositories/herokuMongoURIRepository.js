const realAxios = require("axios");

class HerokuMongoURIRepository {
  constructor({ apiKey, mongoAddonId, axios = realAxios }) {
    if (!apiKey) throw new Error("Heroku API key required");
    if (!mongoAddonId) throw new Error("Mongo addon id required");
    this.http = axios.create({
      baseURL: `https://api.heroku.com/addons/${mongoAddonId}/config`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/vnd.heroku+json; version=3"
      }
    });
  }

  async get() {
    const result = await this.http.get();
    return result.data.find(_ => _.name === "URI").value;
  }
}

module.exports = { HerokuMongoURIRepository };
