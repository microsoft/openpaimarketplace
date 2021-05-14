// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { isNil } = require('lodash');
const { ItemCategory } = require('../models');
const asyncHandler = require('./async_handler');
const error = require('../models/error');

const list = asyncHandler(async (req, res, next) => {
  try {
    const result = await ItemCategory.list();
    res.status(200).json(result);
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const create = asyncHandler(async (req, res, next) => {
  try {
    if (req.tokenInfo.admin) {
      const id = await ItemCategory.create(req.body);
      res.status(201).json({ id: id });
    } else {
      return next(error.createForbidden(`The create category is forbidden`));
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const get = asyncHandler(async (req, res, next) => {
  try {
    const result = await ItemCategory.get(req.params.categoryId);
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
    let result = await ItemCategory.get(req.params.categoryId);
    if (req.tokenInfo.admin) {
      result = await ItemCategory.update(req.params.categoryId, req.body);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('updated');
      }
    } else {
      return next(
        error.createForbidden(
          `The update to the category ${req.params.categoryId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const del = asyncHandler(async (req, res, next) => {
  try {
    let result = await ItemCategory.get(req.params.categoryId);
    if (req.tokenInfo.admin) {
      result = await ItemCategory.del(req.params.categoryId);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('deleted');
      }
    } else {
      return next(
        error.createForbidden(
          `The delete to the category ${req.params.categoryId} is forbidden`,
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
