const express = require("express");
const itemController = require("./controllers/item_controller");
const userController = require("./controllers/user_controller");

const router = new express.Router();

router
  .route("/items")
  .get(itemController.list)
  .post(itemController.create);

router
  .route("/items/:itemId")
  .get(itemController.get)
  .put(itemController.update)
  .delete(itemController.del);

router
  .route("/items/:itemId/description")
  .put(itemController.updateDescription);

router
  .route("/items/:itemId/status")
  .put(itemController.updateStatus);

router
  .route("/items/:itemId/starUsers")
  .get(itemController.listStarUsers);

router.route("/user/:username/starItems").get(userController.list);

router
  .route("/user/:username/starItems/:itemId")
  .get(userController.get)
  .put(userController.update)
  .delete(userController.del);

// module exports
module.exports = router;
