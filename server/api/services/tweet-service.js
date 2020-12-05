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

exports.getTweets = function () {
  const promise = Tweet.find({});
  return promise;
}

/**
 * Updates the tweets based on user comments
 * @param {*} tweetId 
 * @param {*} commentBody 
 */
exports.updateTweetForComments = function (tweetId, commentBody) {
  // Find the tweet and then add the commentBody to the array of comments
  const updatedTweet = Tweet.updateOne(
    { tweetId: tweetId },
    { $push: { comments: commentBody } }
  );
  
  return updatedTweet;
};

/**
 * Updates the tweets when a user likes or dislikes a tweet
 * @param {*} tweetId 
 * @param {*} likesBody 
 */
exports.updateTweetForLikes = function (tweetId, likesBody) {
  // Find the tweet and then like/dislike conditionally
  let updateTweet = null;
  if (likesBody.liked != 0) {
    updateTweet = Tweet.updateOne(
      {
        tweetId: tweetId,
      },
      {
        $push: {
          likes: likesBody.userId,
        }
      }
    );
    
  } else {
    updateTweet = Tweet.updateOne(
      {
        tweetId: tweetId,
      },
      {
        $pull: {
          likes: likesBody.userId,
        },
      }
    );
  }
  return updateTweet;
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
