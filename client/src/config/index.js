const Joi = require("joi-browser");

const ConfigSchema = Joi.object().keys({
  apiURL: Joi.string(),
  environment: Joi.string()
});

export function validateConfig(config) {
  const { value, error } = Joi.validate(config, ConfigSchema, {
    presence: "required",
    convert: true
  });
  if (error) {
    throw error;
  }
  return value;
}

const unvalidatedConfig = require(`./environment/${
  process.env.NODE_ENV
}`).buildConfig();
const config = validateConfig(unvalidatedConfig);

export const apiURL = config.apiURL;
export const environment = config.environment;
