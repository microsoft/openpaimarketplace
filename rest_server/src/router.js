// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const express = require('express');
const itemController = require('./controllers/item_controller');
const userController = require('./controllers/user_controller');
const blobController = require('./controllers/blob_controller');

const router = new express.Router();

router.route('/items').get(itemController.list).post(itemController.create);

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

router.route('/users').get(userController.list).post(userController.create);

router.route('/users/:username').delete(userController.del);

router.route('/users/:username/starItems').get(userController.listItems);

router
  .route('/users/:username/starItems/:itemId')
  .get(userController.getItem)
  .put(userController.updateItem)
  .delete(userController.deleteItem);

router.route('/storages/blobs').get(blobController.list);
router
  .route('/storages/blobs/:blobId')
  .get(blobController.get)
  .put(blobController.update)
  .create(blobController.create)
  .delete(blobController.del);

// module exports
module.exports = router;
