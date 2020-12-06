"use strict";
//import task service.
const tweetService = require("../services/tweet-service");

/**
 * Creates a new Tweet with the request JSON and
 * returns success response.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.createTweets = function (request, response, next) {
  const resolve = (newTweets) => {
    response.status(201).json(newTweets);
  };
  tweetService
    .createTweets(request.body)
    .then(resolve)
    .catch((err) => next(err));
};

exports.getTweets = function (_request, response, next) {
  const resolve = (tweets) => {
    response.status(200);
    response.json(tweets);
  };
  tweetService
    .getTweets()
    .then(resolve)
    .catch((err) => next(err));
};

exports.updateTweetForComments = function (request, response, next) {
  const tweetId = request.params.tweetId;
  const resolve = () => {
    response.status(200).json({
      message: "Tweet Updated successfully",
    });
  };
  tweetService
    .updateTweetForComments(tweetId, request.body)
    .then(resolve)
    .catch((err) => next(err));
};

exports.updateTweetForLikes = function (request, response, next) {
  const tweetId = request.params.tweetId;
  const resolve = () => {
    response.status(200).json({
      message: "Tweet Updated successfully",
    });
  };
  tweetService
    .updateTweetForLikes(tweetId, request.body)
    .then(resolve)
    .catch((err) => next(err));
};
