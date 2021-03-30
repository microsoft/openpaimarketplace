// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const Joi = require('@hapi/joi');
const dotenv = require('dotenv');

dotenv.config();

let config = {
  env: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  serverPort: process.env.SERVER_PORT,
  restServerUri: process.env.REST_SERVER_URI,
};

const configSchema = Joi.object()
  .keys({
    env: Joi.string()
      .valid('development', 'production')
      .default('development'),
    logLevel: Joi.string()
      .valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
      .default('debug'),
    serverPort: Joi.number()
      .integer()
      .min(8000)
      .max(65535)
      .default(9286),
    restServerUri: Joi.string(),
  })
  .required();

const { error, value } = configSchema.validate(config);
if (error) {
  throw new Error(`config error\n${error}`);
}
config = value;

// module exports
module.exports = config;
