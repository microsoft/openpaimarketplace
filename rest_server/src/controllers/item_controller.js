// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const { MarketplaceItem } = require('../models');
const asyncHandler = require('./async_handler');
const { databaseErrorHandler } = require('./database_error_handler');

const list = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.list(
      req.query.name,
      req.query.author,
      req.query.type,
    );
    res.status(200).json(result);
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const create = asyncHandler(async (req, res, next) => {
  try {
    const id = await MarketplaceItem.create(req.body);
    console.log(id);
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
      res.status(200).json(result);
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
      res.status(200).send('updated');
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
      res.status(200).send('deleted');
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const updateDescription = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.updateDescription(
      req.params.itemId,
      req.body,
    );
    if (isNil(result)) {
      res.status(404).send('item not found');
    } else {
      res.status(200).send('description updated');
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const updateStatus = asyncHandler(async (req, res, next) => {
  try {
    if (req.body !== 'approved' && req.body !== 'rejected') {
      res
        .status(405)
        .send('status could only be changed to approved or rejected');
    }
    const result = await MarketplaceItem.updateStatus(
      req.params.itemId,
      req.body,
    );
    if (isNil(result)) {
      res.status(404).send('item not found');
    } else {
      res.status(200).send('status updated');
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const updateSubmits = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.updateSubmits(req.params.itemId);
    if (isNil(result)) {
      res.status(404).send('item not found');
    } else {
      res.status(200).send('ok');
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const listStarUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await MarketplaceItem.listStarUsers(req.params.itemId);
    if (isNil(users)) {
      res.status(404).send('item not found');
    } else {
      res.status(200).json(users.map(user => user.name));
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
  updateDescription,
  updateStatus,
  listStarUsers,
  updateSubmits,
};
