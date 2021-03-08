// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const { Blob } = require('../models');
const asyncHandler = require('./async_handler');
const error = require('../models/error');

const list = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    return next(
      error.createForbidden('Only admin is allowed to this operation'),
    );
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
    return next(error.createInternalServerError(e));
  }
});

const create = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    return next(
      error.createForbidden('Only admin is allowed to this operation'),
    );
  }
  try {
    const id = await Blob.create(req.body);
    res.status(201).json({ id: id });
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const get = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    return next(
      error.createForbidden('Only admin is allowed to this operation'),
    );
  }
  try {
    const result = await Blob.get(req.params.blobId);
    if (isNil(result)) {
      return next(error.createNotFound('Blob not found'));
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const update = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    return next(
      error.createForbidden('Only admin is allowed to this operation'),
    );
  }
  try {
    const result = await Blob.update(req.params.blobId, req.body);
    if (isNil(result)) {
      return next(error.createNotFound('Blob not found'));
    } else {
      res.status(200).send('updated');
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const del = asyncHandler(async (req, res, next) => {
  if (!req.tokenInfo.admin) {
    return next(
      error.createForbidden('Only admin is allowed to this operation'),
    );
  }
  try {
    const result = await Blob.del(req.params.blobId);
    if (isNil(result)) {
      return next(error.createNotFound('Blob not found'));
    } else {
      res.status(200).send('deleted');
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
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
