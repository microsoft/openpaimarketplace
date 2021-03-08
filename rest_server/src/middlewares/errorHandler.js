// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');

const errorHandler = (err, req, res, next) => {
  if (!isNil(err.status)) {
    res.status(err.status);
  } else {
    res.status(500);
  }
  if (!isNil(err.message)) {
    res.send(err.message);
  } else {
    res.send('Unexpected internal server error');
  }
};

module.exports = {
  errorHandler,
};
