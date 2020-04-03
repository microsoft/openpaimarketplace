// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message.trim());
  },
};

// module exports
module.exports = logger;
