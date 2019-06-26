const Joi = require("@hapi/joi");

const ConfigSchema = Joi.object()
  .keys({
    environment: Joi.string().required()
  })
  .required();

function validateConfig(config) {
  return Joi.attempt(config, ConfigSchema, "Config is invalid");
}

const config = validateConfig(require(`./environment/${process.env.NODE_ENV}`));

module.exports = {
  validateConfig,
  ...config
};
