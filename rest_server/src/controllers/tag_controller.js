// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { isNil } = require('lodash');
const { ItemTag } = require('../models');
const asyncHandler = require('./async_handler');
const error = require('../models/error');

const list = asyncHandler(async (req, res, next) => {
  try {
    const result = await ItemTag.list();
    res.status(200).json(result);
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const create = asyncHandler(async (req, res, next) => {
  try {
    const id = await ItemTag.create(req.body);
    res.status(201).json({ id: id });
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const get = asyncHandler(async (req, res, next) => {
  try {
    const result = await ItemTag.get(req.params.tagId);
    if (isNil(result)) {
      return next(error.createNotFound());
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const update = asyncHandler(async (req, res, next) => {
  try {
    let result = await ItemTag.get(req.params.tagId);
    if (req.tokenInfo.admin) {
      result = await ItemTag.update(req.params.tagId, req.body);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('updated');
      }
    } else {
      return next(
        error.createForbidden(
          `The update to the tag ${req.params.tagId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const del = asyncHandler(async (req, res, next) => {
  try {
    let result = await ItemTag.get(req.params.tagId);
    if (req.tokenInfo.admin) {
      result = await ItemTag.del(req.params.tagId);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('deleted');
      }
    } else {
      return next(
        error.createForbidden(
          `The delete to the tag ${req.params.tagId} is forbidden`,
        ),
      );
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
