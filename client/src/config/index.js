const Joi = require("joi-browser");

const ConfigSchema = Joi.object().keys({
  apiURL: Joi.string(),
  environment: Joi.string(),
  loggingEnabled: Joi.boolean(),
  faviconPaths: Joi.array().items(Joi.string().required())
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

const environmentName = process.env.REACT_APP_ENVIRONMENT;
const unvalidatedConfig = require(`./environment/${environmentName}`).buildConfig();
const config = validateConfig(unvalidatedConfig);

export const apiURL = config.apiURL;
export const environment = config.environment;
export const appName = "Upscale";
export const loggingEnabled = config.loggingEnabled;
export const faviconPaths = config.faviconPaths;
