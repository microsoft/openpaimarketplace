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

const createInternalServerError = message => {
  const resMessage = isNil(message) ? 'Internal server error' : message;
  return createError(500, resMessage);
};

module.exports = {
  createBadRequest,
  createUnauthorized,
  createForbidden,
  createNotFound,
  createInternalServerError,
};
