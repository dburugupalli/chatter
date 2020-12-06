"use strict";
//import task service.
const tweetService = require("../services/tweet-service"),
      utilConstants = require("../utils/Constants"),
      log4js = require("log4js");

log4js.configure({
  appenders: {
    everything: { type: "file", filename: "logs/chatterApp.log" },
  },
  categories: {
    default: { appenders: ["everything"], level: "debug" },
  },
});

const logger = log4js.getLogger("chatterApp");

/**
 * Creates a new Tweet with the request JSON and
 * returns success response.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.createTweets = function (request, response) {
  console.log("iamhere")
    try {
        const resolve = (newTweets) => {
          response.status(201).json(newTweets);
        };
        tweetService
          .createTweets(request.body)
          .then(resolve)
          .catch(renderErrorResponse(response));
      } catch (err) {
        renderErrorResponse(err);
      }
};

/**
 * Clears all tasks
 * returns success response.
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */

// exports.deleteTasks = (_request, response) => {
//   try {
//         const resolve = () => {
//             response.status(200).json({
//               message: "All tasks cleared"
//             })
//     };

//     taskService
//       .deleteTasks()
//       .then(resolve)
//       .catch(renderErrorResponse(response));

//   } catch(err){
//     renderErrorResponse(err)
//   }
// }

// /**
//  * Returns Updated Task response.
//  *
//  * @param request
//  * @param response
//  */
// exports.updateTask = (request, response) => {
//   try {
//     const resolve = () => {
//         response.status(200).json({
//             message: "Successfully Updated the task"
//         });
//     };
//     taskService
//       .updateTask(request.params.taskId)
//       .then(resolve)
//       .catch(renderErrorResponse(response));
//   } catch (err) {
//     renderErrorResponse(err);
//   }
// };

// /**
//  *
//  * Returns all tasks.
//  * @param {request} {HTTP request object}
//  * @param {response} {HTTP response object}
//  */
// exports.getTasks = (_request, response) => {
//   try {
//         const resolve = (tasks) => {
//             response.status(200);
//             response.json(tasks);
//     };

//     taskService
//       .getTasks()
//       .then(resolve)
//       .catch(renderErrorResponse(response));

//   } catch(err){
//     renderErrorResponse(err)
//   }
// }

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
  const errorCallback = (error) => {
    if (error && error.message === utilConstants.TASK_ASSIGNEE_VALIDATION_ERROR) {
        logger.warn(`Client error: ${error.message}`);
        response.status(400).json({
            message: utilConstants.ASSIGNEE_ERROR,
        });
    } else if (error && error.message === utilConstants.TASK_DESC_VALIDATION_ERROR) {
        response.status(400);
        logger.warn(`Client error: ${error.message}`);
        response.json({
            message: utilConstants.TASK_DESC_ERROR,
        });
    } else {
      response.status(500);
      logger.fatal(`Server error: ${error.message}`);
      response.json({
        message: utilConstants.SERVER_ERR,
      });
    }
  };

  return errorCallback;
};
