const Joi = require("@hapi/joi");

const ConfigSchema = Joi.object().keys({
  environment: Joi.string(),
  deployedAt: Joi.date()
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

const unvalidatedConfig = require(`./environment/${process.env.NODE_ENV}`).buildConfig();
const config = validateConfig(unvalidatedConfig);

module.exports = {
  validateConfig,
  ...config
};
