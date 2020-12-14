/**
 * User endpoint route definitions.
 */

"use strict";

const errorHandler = require("../utils/error_handler");

module.exports = function (app) {
  const userController = require("../controllers/user-controller");

  // Task Routes for creating task
  app.route("/v1/register").post(userController.register, errorHandler);
  app.route("/v1/authenticate").post(userController.authenticate, errorHandler);
  app.route("/v1/getAll").get(userController.getAll, errorHandler);

};
