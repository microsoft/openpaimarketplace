// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const express = require('express');
const itemController = require('./controllers/item_controller');
const tagController = require('./controllers/tag_controller');
const categoryController = require('./controllers/category_controller');
const storageController = require('./controllers/storage_controller');
const token = require('./middlewares/token');

const router = new express.Router();

router
  .route('/items')
  .get(token.checkAuthAndGetUserInfo, itemController.list)
  .post(token.checkAuthAndGetTokenInfo, itemController.create);

router
  .route('/items/:itemId')
  .get(token.checkAuthAndGetUserInfo, itemController.get)
  .put(token.checkAuthAndGetTokenInfo, itemController.update)
  .delete(token.checkAuthAndGetTokenInfo, itemController.del);

router
  .route('/tags')
  .get(token.checkAuthAndGetUserInfo, tagController.list)
  .post(token.checkAuthAndGetTokenInfo, tagController.create);

router
  .route('/tags/:tagId')
  .get(token.checkAuthAndGetUserInfo, tagController.get)
  .put(token.checkAuthAndGetTokenInfo, tagController.update)
  .delete(token.checkAuthAndGetTokenInfo, tagController.del);

router
  .route('/categories')
  .get(token.checkAuthAndGetUserInfo, categoryController.list)
  .post(token.checkAuthAndGetTokenInfo, categoryController.create);

router
  .route('/categories/:categoryId')
  .get(token.checkAuthAndGetUserInfo, categoryController.get)
  .put(token.checkAuthAndGetTokenInfo, categoryController.update)
  .delete(token.checkAuthAndGetTokenInfo, categoryController.del);

router
  .route('/storages/blobs')
  .get(token.checkAuthAndGetTokenInfo, storageController.list)
  .post(token.checkAuthAndGetTokenInfo, storageController.create);
router
  .route('/storages/blobs/:blobId')
  .get(token.checkAuthAndGetTokenInfo, storageController.get)
  .put(token.checkAuthAndGetTokenInfo, storageController.update)
  .delete(token.checkAuthAndGetTokenInfo, storageController.del);

// module exports
module.exports = router;
