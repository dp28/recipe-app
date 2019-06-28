const Joi = require("@hapi/joi");

const ConfigSchema = Joi.object().keys({
  environment: Joi.string(),
  deployedAt: Joi.date(),
  version: Joi.string()
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

console.log("Using environment:", config.environment);

module.exports = {
  validateConfig,
  ...config
};
