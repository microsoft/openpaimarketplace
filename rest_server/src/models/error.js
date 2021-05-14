// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createError = require('http-errors');
const { isNil } = require('lodash');

const createBadRequest = message => {
  const resMessage = isNil(message) ? 'Invalid input' : message;
  return createError(400, resMessage);
};

const createUnauthorized = message => {
  const resMessage = isNil(message)
    ? 'Authentication token is missing or invalid'
    : message;
  return createError(401, resMessage);
};

const createForbidden = message => {
  const resMessage = isNil(message)
    ? 'You have no access to the resource or process'
    : message;
  return createError(403, resMessage);
};

const createNotFound = message => {
  const resMessage = isNil(message) ? 'Result not found' : message;
  return createError(404, resMessage);
};

const createInternalServerError = err => {
  let message = 'Internal server error';
  if (err instanceof Error) {
    if (
      err.name === 'SequelizeConnectionRefusedError' ||
      err.name === 'SequelizeConnectionError'
    ) {
      message = 'Database connection failed';
    } else if (err.name === 'SequelizeDatabaseError') {
      message = 'Database error';
    } else if (err.name === 'SequelizeValidationError') {
      message = 'Database validation not passed';
      return createBadRequest(message);
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      message = 'The item has already exists';
      return createBadRequest(message);
    } else {
      message = 'Unexpected internal error';
    }
  } else if (typeof err === 'string') {
    message = err;
  }
  return createError(500, message);
};

module.exports = {
  createBadRequest,
  createUnauthorized,
  createForbidden,
  createNotFound,
  createInternalServerError,
};
