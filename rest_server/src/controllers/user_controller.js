// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { User } = require("../models");
const { isEmpty, isNil } = require("lodash");
const asyncHandler = require("./async_handler");
const { databaseErrorHandler } = require("./database_error_handler");

const list = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.list();
    res.status(200).json(users);
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const create = asyncHandler(async (req, res, next) => {
  try {
    await User.create(req.body);
    res.status(201).send("created");
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const listItems = asyncHandler(async (req, res, next) => {
  try {
    const items = await User.listItems(req.params.username);
    if (isNil(items)) {
      res.status(400).send("user not found");
    } else {
      res.status(200).json(items);
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const getItem = asyncHandler(async (req, res, next) => {
  try {
    const items = await User.getItem(req.params.username, req.params.itemId);
    if (isNil(items)) {
      res.status(400).send("user not found");
    } else if (isEmpty(items)) {
      res.status(404).send("item not found");
    } else {
      res.status(200).json(items[0]);
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const updateItem = asyncHandler(async (req, res, next) => {
  try {
    const result = await User.updateItem(
      req.params.username,
      req.params.itemId
    );
    if (isNil(result)) {
      res.status(400).send("user not found");
    } else if (result === "item not exists") {
      res.status(404).send("item not exists");
    } else if (result === false) {
      res.status(409).send("conflict");
    } else if (result === true) {
      res.status(200).send("ok");
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

const deleteItem = asyncHandler(async (req, res, next) => {
  try {
    const result = await User.deleteItem(
      req.params.username,
      req.params.itemId
    );
    if (isNil(result)) {
      res.status(400).send("user not found");
    } else if (result === false) {
      res.status(404).send("item not found");
    } else if (result === true) {
      res.status(200).send("ok");
    }
  } catch (e) {
    databaseErrorHandler(e, res);
  }
});

// module exports
module.exports = {
  list,
  create,
  listItems,
  getItem,
  updateItem,
  deleteItem
};
