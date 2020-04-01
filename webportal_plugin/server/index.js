// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const config = require('./config');
const logger = require('./logger');
const app = require('./app');

logger.info(`config: ${JSON.stringify(config)}`);

// start the server
app.listen(config.serverPort, () => {
  logger.info(`Webportal server starts on port ${config.serverPort}`);
});
