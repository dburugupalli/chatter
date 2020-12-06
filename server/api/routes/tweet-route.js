/**
 * Tweet endpoint route definitions.
 */

"use strict";

const errorHandler = require("../utils/error_handler");

module.exports = function (app) {
  const tweetController = require("../controllers/tweet-controller");

  // Tweet Route for creating tweets
  app.route("/v1/bulktweets").post(tweetController.createTweets, errorHandler);

  // Update a Tweet for comments
  app.route("/v1/:tweetId/comments").put(tweetController.updateTweetForComments, errorHandler);

  // Update a Tweet for likes
  app.route("/v1/:tweetId/likes").put(tweetController.updateTweetForLikes, errorHandler);

  // Get all tweets
  app.route("/v1/tweets").get(tweetController.getTweets, errorHandler);
};
