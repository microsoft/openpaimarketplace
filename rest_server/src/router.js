// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const express = require('express');
const itemController = require('./controllers/item_controller');
const userController = require('./controllers/user_controller');
const storageController = require('./controllers/storage_controller');
const token = require('./middlewares/token');

const router = new express.Router();

router
  .route('/items')
  .get(token.checkAuthAndGetUserInfo, itemController.list)
  .post(token.checkAuthAndGetTokenInfo, itemController.create);

router
  .route('/items/:itemId')
  .get(itemController.get)
  .put(itemController.update)
  .delete(itemController.del);

router
  .route('/items/:itemId/description')
  .put(itemController.updateDescription);

router.route('/items/:itemId/status').put(itemController.updateStatus);

router.route('/items/:itemId/submits').put(itemController.updateSubmits);

router.route('/items/:itemId/starUsers').get(itemController.listStarUsers);

router
  .route('/users')
  .get(userController.list)
  .post(userController.create);

router.route('/users/:username').delete(userController.del);

router.route('/users/:username/starItems').get(userController.listItems);

router
  .route('/users/:username/starItems/:itemId')
  .get(userController.getItem)
  .put(userController.updateItem)
  .delete(userController.deleteItem);

router
  .route('/storages/blobs')
  .get(storageController.list)
  .post(storageController.create);
router
  .route('/storages/blobs/:blobId')
  .get(storageController.get)
  .put(storageController.update)
  .delete(storageController.del);

router.route('/tokens/user').get(token.checkAuthAndGetUserInfo, token.userInfoEcho);

router.route('/tokens/token').get(token.checkAuthAndGetTokenInfo, token.tokenInfoEcho);

// module exports
module.exports = router;
