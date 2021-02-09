// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const { Blob } = require('../models');
const asyncHandler = require('./async_handler');
const { databaseErrorHandler } = require('./database_error_handler');
const createError = require('http-errors');

const list = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    const httpError = createError(
      'Forbidden',
      'ForbiddenUserError',
      `Non-admin is not allow to do this operation.`,
    );
    return res.status(httpError.status).send(httpError.message);
  }
  try {
    const result = await Blob.list(
      req.query.type,
      req.query.storageAccount,
      req.query.containerName,
      req.query.user,
    );
    res.status(200).json(result);
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const create = asyncHandler(async (req, res, next) => {
  // TODO: Add validation to distinguish TypeError
  if (!req.tokenInfo.admin) {
    const httpError = createError(
      'Forbidden',
      'ForbiddenUserError',
      `Non-admin is not allow to do this operation.`,
    );
    return res.status(httpError.status).send(httpError.message);
  }
  try {
    const id = await Blob.create(req.body);
    res.status(201).json({ id: id });
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const get = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    const httpError = createError(
      'Forbidden',
      'ForbiddenUserError',
      `Non-admin is not allow to do this operation.`,
    );
    return res.status(httpError.status).send(httpError.message);
  }
  try {
    const result = await Blob.get(req.params.blobId);
    if (isNil(result)) {
      res.status(404).send('blob not found');
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const update = asyncHandler(async (req, res, next) => {
  // TODO: Add validation to distinguish TypeError
  if (!req.tokenInfo.admin) {
    const httpError = createError(
      'Forbidden',
      'ForbiddenUserError',
      `Non-admin is not allow to do this operation.`,
    );
    return res.status(httpError.status).send(httpError.message);
  }
  try {
    const result = await Blob.update(req.params.blobId, req.body);
    if (isNil(result)) {
      res.status(404).send('blob not found');
    } else {
      res.status(200).send('updated');
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const del = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    const httpError = createError(
      'Forbidden',
      'ForbiddenUserError',
      `Non-admin is not allow to do this operation.`,
    );
    return res.status(httpError.status).send(httpError.message);
  }
  try {
    const result = await Blob.del(req.params.blobId);
    if (isNil(result)) {
      res.status(404).send('blob not found');
    } else {
      res.status(200).send('deleted');
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

// module exports
module.exports = {
  list,
  create,
  get,
  update,
  del,
};
