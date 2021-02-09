// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const { MarketplaceItem } = require('../models');
const asyncHandler = require('./async_handler');
const { databaseErrorHandler } = require('./database_error_handler');
const createError = require('http-errors');

function checkReadPermission(userInfo, item) {
  if (userInfo.admin === true) {
    return true;
  }
  if (userInfo.username === item.author) {
    return true;
  }
  if (userInfo.grouplist) {
    for (const group of userInfo.grouplist) {
      if (item.group.includes(group)) {
        return true;
      }
    }
  }
  return false;
}

function checkWritePermission(tokenInfo, item) {
  if (tokenInfo.admin === true) {
    return true;
  }
  if (tokenInfo.username === item.author) {
    return true;
  }
  return false;
}

const list = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.list(
      req.query.name,
      req.query.author,
      req.query.type,
      req.query.source,
      req.query.keyword,
      req.userInfo,
    );
    res.status(200).json(result);
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const create = asyncHandler(async (req, res, next) => {
  if (req.body.author !== req.tokenInfo.username) {
    const httpError = createError(
      'BadRequest',
      'InvalidTokenError',
      'Token should belong to author',
    );
    return res.status(httpError.status).send(httpError.message);
  }
  try {
    const id = await MarketplaceItem.create(req.body);
    res.status(201).json({ id: id });
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const get = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.get(req.params.itemId);
    if (isNil(result)) {
      res.status(404).send('item not found');
    } else {
      if (checkReadPermission(req.userInfo, result)) {
        res.status(200).json(result);
      } else {
        const httpError = createError(
          'Forbidden',
          'ForbiddenUserError',
          `User ${req.userInfo.username} is not allowed to get item ${req.params.itemId}.`,
        );
        return res.status(httpError.status).send(httpError.message);
      }
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const update = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.update(req.params.itemId, req.body);
    if (isNil(result)) {
      res.status(404).send('item not found');
    } else {
      if (checkWritePermission(req.tokenInfo, result)) {
        res.status(200).send('updated');
      } else {
        const httpError = createError(
          'Forbidden',
          'ForbiddenUserError',
          `User ${req.tokenInfo.username} is not allowed to update item ${req.params.itemId}.`,
        );
        return res.status(httpError.status).send(httpError.message);
      }
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const del = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.del(req.params.itemId);
    if (isNil(result)) {
      res.status(404).send('item not found');
    } else {
      if (checkWritePermission(req.tokenInfo, result)) {
        res.status(200).send('deleted');
      } else {
        const httpError = createError(
          'Forbidden',
          'ForbiddenUserError',
          `User ${req.tokenInfo.username} is not allowed to delete item ${req.params.itemId}.`,
        );
        return res.status(httpError.status).send(httpError.message);
      }
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
