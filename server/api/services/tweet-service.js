/**
 * Service for Tweet operations.
 */

"use strict";
const mongoose = require("mongoose"),
  Tweet = mongoose.model("Tweets");

/**
 * Saves and returns the new tweets object.
 */
exports.createTweets = function (tweets) {
  const promise = Tweet.insertMany(tweets);
  return promise;
};

/**
 * Updates and returns the Task object.
 * @param {String} taskId
 */
// exports.updateTask = function (taskId) {
//   const promise = Task.findOneAndUpdate(
//     { uid: taskId },
//     { $set: { completed: true } },
//   ).exec();
//   return promise;
// };

// /**
//  * Clears all the tasks
//  */
// exports.deleteTasks = function () {
//   const promise = Task.deleteMany().exec();
//   return promise;
// };



/**
 * Returns the list of tasks
 */
// exports.getTasks = function () {
//   const promise = Task.find({}, { createdAt: 0, updatedAt: 0, _id: 0 }).exec();
//   return promise;
// };
