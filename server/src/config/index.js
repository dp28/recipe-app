const Joi = require("@hapi/joi");
const { DEBUG, INFO, WARNING, ERROR, DISABLED } = require("../utils/logLevels");

const defaultConfig = {
  logLevel: INFO
};

const ConfigSchema = Joi.object().keys({
  environment: Joi.string(),
  deployedAt: Joi.date(),
  version: Joi.string(),
  mongoURIRepository: Joi.any(),
  logLevel: Joi.string()
    .valid(DEBUG, INFO, WARNING, ERROR, DISABLED)
    .optional()
});

function validateConfig(config) {
  const { value, error } = Joi.validate(config, ConfigSchema, {
    presence: "required",
    convert: true
  });
  if (error) {
    throw error;
  }
  return value;
}

const environment = process.env.NODE_ENV;
const unvalidatedConfig = require(`./environment/${environment}`).buildConfig();
const config = validateConfig(unvalidatedConfig);

if (config.environment !== "TEST") {
  console.log("Using environment:", config.environment);
}

module.exports = {
  validateConfig,
  ...defaultConfig,
  ...config
};
