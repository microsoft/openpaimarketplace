// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { isNil } = require('lodash');
const { MarketplaceItem, ItemCategory } = require('../models');
const asyncHandler = require('./async_handler');
const yaml = require('js-yaml');
const protocolValidator = require('../utils/protocol');
const error = require('../models/error');

const OFFICIAL_EXAMPLE = 'official example';

async function checkReadPermission(userInfo, item, categories) {
  if (userInfo.admin === true) {
    return true;
  }
  if (categories === undefined) {
    categories = await MarketplaceItem.getCategories(item);
  }
  const categoriesArray = categories.map(category => category.name);
  if (
    !categoriesArray.includes(OFFICIAL_EXAMPLE) &&
    userInfo.username === item.author
  ) {
    return true;
  }
  if (item.isPublic) {
    return true;
  }
  if (!item.isPrivate && (userInfo.grouplist && item.groupList)) {
    for (const group of userInfo.grouplist) {
      if (item.groupList.includes(group)) {
        return true;
      }
    }
  }
  return false;
}

async function checkWritePermission(tokenInfo, item, categories) {
  if (tokenInfo.admin === true) {
    return true;
  }
  if (categories === undefined) {
    categories = await MarketplaceItem.getCategories(item);
  }
  const categoriesArray = categories.map(category => category.name);
  if (
    !categoriesArray.includes(OFFICIAL_EXAMPLE) &&
    tokenInfo.username === item.author
  ) {
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
      req.query.tag ? req.query.tag.split(',') : undefined,
      req.query.category ? req.query.category.split(',') : undefined,
      req.userInfo,
    );
    res.status(200).json(result);
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const create = asyncHandler(async (req, res, next) => {
  if (isNil(req.body.author)) {
    return next(
      error.createBadRequest('Author info is missing in require body'),
    );
  }
  if (req.body.author !== req.tokenInfo.username) {
    return next(
      error.createForbidden(
        `You are not allowed to create item with author ${req.body.author}`,
      ),
    );
  }
  if (req.body.protocol === '') {
    return next(error.createBadRequest('Empty protocol is not allowed'));
  }

  try {
    const protocol = yaml.load(req.body.protocol);
    const valid = protocolValidator.validate(protocol);
    if (!valid) {
      return next(error.createBadRequest('The protocol is not valid'));
    }
  } catch (e) {
    return next(error.createBadRequest('The protocol is not valid'));
  }

  try {
    const id = await MarketplaceItem.create(req.body);
    res.status(201).json({ id: id });
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const get = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.get(req.params.itemId);
    if (isNil(result)) {
      return next(error.createNotFound());
    } else {
      if (await checkReadPermission(req.userInfo, result)) {
        res.status(200).json(result);
      } else {
        return next(
          error.createForbidden(
            `The access to the item ${req.params.itemId} is forbidden`,
          ),
        );
      }
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const update = asyncHandler(async (req, res, next) => {
  try {
    let result = await MarketplaceItem.get(req.params.itemId);
    if (await checkWritePermission(req.tokenInfo, result)) {
      result = await MarketplaceItem.update(req.params.itemId, req.body);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('updated');
      }
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const del = asyncHandler(async (req, res, next) => {
  try {
    let result = await MarketplaceItem.get(req.params.itemId);
    if (await checkWritePermission(req.tokenInfo, result)) {
      result = await MarketplaceItem.del(req.params.itemId);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('deleted');
      }
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const listTags = asyncHandler(async (req, res, next) => {
  try {
    let result = await MarketplaceItem.get(req.params.itemId);
    if (await checkReadPermission(req.userInfo, result)) {
      result = await MarketplaceItem.getTags(result);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).json(result);
      }
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const addTag = asyncHandler(async (req, res, next) => {
  try {
    let result = await MarketplaceItem.get(req.params.itemId);
    if (await checkWritePermission(req.tokenInfo, result)) {
      result = await MarketplaceItem.addTag(result, req.params.tagId);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('added');
      }
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const deleteTag = asyncHandler(async (req, res, next) => {
  try {
    let result = await MarketplaceItem.get(req.params.itemId);
    if (await checkWritePermission(req.tokenInfo, result)) {
      result = await MarketplaceItem.deleteTag(result, req.params.tagId);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).json('deleted');
      }
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const listCategories = asyncHandler(async (req, res, next) => {
  try {
    const result = await MarketplaceItem.get(req.params.itemId);
    const categories = await MarketplaceItem.getCategories(result);
    if (isNil(result)) {
      return next(error.createNotFound());
    }
    if (await checkReadPermission(req.userInfo, result, categories)) {
      res.status(200).json(categories);
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const addCategory = asyncHandler(async (req, res, next) => {
  try {
    let result = await MarketplaceItem.get(req.params.itemId);
    if (await checkWritePermission(req.tokenInfo, result)) {
      const category = await ItemCategory.get(req.params.categoryId);
      if (category.name === OFFICIAL_EXAMPLE && req.tokenInfo.admin !== true) {
        return next(
          error.createForbidden(
            'Only admin can set "official example" category.',
          ),
        );
      }
      result = await MarketplaceItem.addCategory(result, req.params.categoryId);
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).send('added');
      }
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
        ),
      );
    }
  } catch (e) {
    return next(error.createInternalServerError(e));
  }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    let result = await MarketplaceItem.get(req.params.itemId);
    if (await checkWritePermission(req.tokenInfo, result)) {
      result = await MarketplaceItem.deleteCategory(
        result,
        req.params.categoryId,
      );
      if (isNil(result)) {
        return next(error.createNotFound());
      } else {
        res.status(200).json('deleted');
      }
    } else {
      return next(
        error.createForbidden(
          `The access to the item ${req.params.itemId} is forbidden`,
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
  listTags,
  addTag,
  deleteTag,
  listCategories,
  addCategory,
  deleteCategory,
};
