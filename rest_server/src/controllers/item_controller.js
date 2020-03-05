const { Op } = require("sequelize");
const { isNil } = require("lodash");
const { MarketplaceItem } = require("../models");
const asyncHandler = require("../asyncHandler");

const list = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.list(
      req.query.name,
      req.query.author,
      req.query.category
    );
    res.status(200).json(result);
  } catch (e) {
    if (
      e.name === "SequelizeConnectionRefusedError" ||
      e.name === "SequelizeConnectionError"
    ) {
      res.status(500).send("database connection failed");
    }
    if (e.name === "SequelizeDatabaseError") {
      res.status(500).send("database error");
    } else {
      throw e;
    }
  }
});

const create = asyncHandler(async (req, res, next) => {
  await MarketplaceItem.create(req.body);
  res.status(201).send("created");
});

const get = asyncHandler(async (req, res, next) => {
  const result = await MarketplaceItem.get(req.params.itemId);
  if (isNil(result)) {
    res.status(404).send("item not found");
  } else {
    res.status(200).json(result);
  }
});

const update = asyncHandler(async (req, res, next) => {
  const result = await MarketplaceItem.update(req.params.itemId, req.body);
  if (isNil(result)) {
    res.status(404).send("item not found");
  } else {
    res.status(200).send("updated");
  }
});

const del = asyncHandler(async (req, res, next) => {
  const result = await MarketplaceItem.del(req.params.itemId);
  if (isNil(result)) {
    res.status(404).send("item not found");
  } else {
    res.status(200).send("deleted");
  }
});

const listStarUsers = asyncHandler(async (req, res, next) => {
  const users = await MarketplaceItem.listStarUsers(req.params.itemId);
  if (isNil(users)) {
    res.status(404).send("item not found");
  } else {
    res.status(200).json(users.map(user => user.name));
  }
});

// module exports
module.exports = {
  list,
  create,
  get,
  update,
  del,
  listStarUsers
};
