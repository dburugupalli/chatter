/**
 * Tweet endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const tweetController = require("../controllers/tweet-controller");

  // Tweet Routes for creating tweets
  app.route("/v1/tweets").post(tweetController.createTweet);

  // Tweet Routes for updating the tweets for comments
  app.route("/v1/:tweetId/comments").put(tweetController.updateTweetForComments);

  // Tweet Routes for updating the tweets for likes
  app.route("/v1/:tweetId/likes").put(tweetController.updateTweetForLikes);
  
  // Tweet routes for getting all available tweets
  app.route("/v1/tweets").get(tweetController.getTweets);

};
