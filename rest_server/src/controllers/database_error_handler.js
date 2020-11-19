// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const databaseErrorHandler = (error, res) => {
  if (
    error.name === 'SequelizeConnectionRefusedError' ||
    error.name === 'SequelizeConnectionError'
  ) {
    res.status(500).send('database connection failed');
  }
  if (error.name === 'SequelizeDatabaseError') {
    res.status(500).send('database error');
  }
  if (error.name === 'SequelizeValidationError') {
    res.status(400).send('bad request: database validation not passed');
  } else {
    throw error;
  }
};

// module exports
module.exports = {
  databaseErrorHandler,
};
