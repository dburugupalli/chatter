/**
 * Tasks endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const userController = require("../controllers/user-controller");

  // Task Routes for creating task
  app.route("/v1/register").post(userController.register);
  app.route("/v1/authenticate").post(userController.authenticate);
  app.route("/v1/getAll").get(userController.getAll);

};
