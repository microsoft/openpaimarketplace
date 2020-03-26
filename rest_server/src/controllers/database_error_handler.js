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
  } else {
    throw error;
  }
};

// module exports
module.exports = {
  databaseErrorHandler,
};
