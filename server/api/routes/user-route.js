/**
 * Tasks endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const userController = require("../controllers/user-controller");

  // Routes to create a user
  app.route("/v1/users").post(userController.createUser);

  // // Task Routes for Marking a Task as complete
  // app.route("/v1/tasks/:taskId").put(taskController.updateTask);
  
  // // Task routes for getting all available tasks
  // app.route("/v1/tasks")
  //   .get(taskController.getTasks);

  //  // Task Routes for clearing all tasks
  //  app.route("/v1/tasks").delete(taskController.deleteTasks);
};
