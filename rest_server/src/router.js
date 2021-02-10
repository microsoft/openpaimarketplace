// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const express = require('express');
const itemController = require('./controllers/item_controller');
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
