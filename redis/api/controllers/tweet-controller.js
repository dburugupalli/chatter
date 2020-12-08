"use strict";
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_NODE,
  port: 6379,
});

const tweetKey = "tweets";
client.set("key", tweetKey, redis.print);
client.get("key", redis.print);

const fetch = require("node-fetch");
const serverName = process.env.BACKEND_SERVER_NAME;
const baseUrl = `http://${serverName}:5000/v1`;


// Function used to clear cache after the cache reached 5 requests and calls the main backend to
// update the records
function clearCache() {
  // get the values from cache
  client.lrange(tweetKey, 0, -1, function (err, reply) {
    if (!err) {
      const tweets = reply.map(JSON.parse);
      if (tweets && tweets.length >= 5) {
        // call the node server to dump the data
        fetch(`${baseUrl}/bulktweets`, {
          method: "POST",
          body: JSON.stringify(tweets),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((json) => console.log(json));

          client.del(tweetKey);
      }
    }
  });
}

/**
 * Creates a new task in cache with the request JSON and
 * returns success response.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.createTweet = function (request, response) {
  // construct a Tweet body
  const tweetObj = constructTweet(request.body);

  // validate for atleast tweetId and tweet
  if (tweetObj.tweetId == null || tweetObj.tweet == null) {
    response.status(400).json({
      message: "Unable to process the input",
    });
  } else {
    client.rpush([tweetKey, JSON.stringify(tweetObj)], function (err, _reply) {
      if (!err) {
        response.status(201).json(tweetObj);
      } else {
        response.status(400).json({
          message: "Unable to process the input",
        });
      }
    });
  }

  // clear the cache if needed
  clearCache();

};

const constructTweet = (tweetBody) => {
  return {
    tweetId: tweetBody.tweetId,
    tweet: tweetBody.tweet,
    imageLink: tweetBody.imageLink,
    createdBy: tweetBody.createdBy,
    createdAt: "timeStamp from frontend",
    likes: [],
    comments: [],
  };
};

/**
 * Returns Updated Tweet response.
 *
 * @param request
 * @param response
 */
exports.updateTweetForComments = (request, response) => {
  let isFoundInCache = false;
  // check if the doc exists in cache. If so update in the cache and return
  // else update in the db
  client.lrange(tweetKey, 0, -1, function (err, reply) {
    if (!err) {
      const tweets = reply.map(JSON.parse);
      for (let i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
        if (tweet.tweetId == request.params.tweetId) {
          isFoundInCache = true;
          tweet.comments.unshift(request.body);
          client.del(tweetKey, function (_err, reply) {
            console.log(reply);
          });

          //Use multi() to pipeline multiple commands at once
	        let multi = client.multi();
         
	        for (let i = 0; i < tweets.length; i++) {
		          multi.rpush(tweetKey, JSON.stringify(tweets[i]));
	        }

	        multi.exec(function (err, _reply) {
              if (!err) {
                response.status(200).json({
                  message: "Tweet updated successfully",
                });
              } else {
                response.status(400).json({
                  message: "Unable to process the input",
                });
              }
            }
          );
          break;
        }
      }

      // if the task is not found in cache, you need to update the server
      if (!isFoundInCache) {
        // make a call to server api
        fetch(`${baseUrl}/${request.params.tweetId}/comments`, {
          method: "PUT",
          body: JSON.stringify(request.body),
          headers: {
            "Content-Type": "application/json",
            Authorization: request.headers.authorization,
          },
        })
          .then((res) => res.json())
          .then(() =>
            response.status(200).json({
              message: "Tweet updated successfully",
            })
          );
      }
    } else {
      response.status(400).json({
        message: "Cannot process request at this time",
      });
    }
  });
};

/**
 * Returns Updated Tweet response.
 *
 * @param request
 * @param response
 */
exports.updateTweetForLikes = (request, response) => {
  let isFoundInCache = false;
  // check if the doc exists in cache. If so update in the cache and return
  // else update in the db
  client.lrange(tweetKey, 0, -1, function (err, reply) {
    if (!err) {
      const tweets = reply.map(JSON.parse);
      for (let i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
        if (tweet.tweetId == request.params.tweetId) {
          isFoundInCache = true;
          // User disliked the tweet
          if (request.body.liked == 0) {
            const index = array.indexOf(request.body.userId);
            if (index > -1) {
              tweet.likes.splice(index, 1);
            }
          } else {
            tweet.likes.push(request.body.userId);
          }

          client.del(tweetKey, function (_err, reply) {
            console.log(reply);
          });

          
	        //Use multi() to pipeline multiple commands at once
	        let multi = client.multi();
         
	        for (let i = 0; i < tweets.length; i++) {
		          multi.rpush(tweetKey, JSON.stringify(tweets[i]));
	        }

	        multi.exec(function (err, _reply) {
              if (!err) {
                client.lrange(tweetKey, 0, -1, function (err, reply) {
                  if (!err) {
                    const tweets = reply.map(JSON.parse);
                    console.log('Updated!!');
                    console.log(tweets);
                  }
                });
                response.status(200).json({
                  message: "Tweet updated successfully",
                });
              } else {
                response.status(400).json({
                  message: err,
                });
              }
            }
          );
          break;
        }
      }

      // if the task is not found in cache, you need to update the server
      if (!isFoundInCache) {
        // make a call to server api
        fetch(`${baseUrl}/${request.params.tweetId}/likes`, {
          method: "PUT",
          body: JSON.stringify(request.body),
          headers: {
            "Content-Type": "application/json",
            Authorization: request.headers.authorization,
          },
        })
          .then((res) => res.json())
          .then(() =>
            response.status(200).json({
              message: "Tweet updated successfully",
            })
          );
      }
    } else {
      response.status(400).json({
        message: "Cannot process request at this time",
      });
    }
  });
};

/**
 *
 * Returns all Tweets.
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getTweets = (request, response) => {
  // Get the Tweets from cache
  client.lrange(tweetKey, 0, -1, function (err, reply) {
    if (!err) {
      const tweets = reply.map(JSON.parse);
      // call the server api to fetch the previous results
      fetch(`${baseUrl}/tweets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.authorization,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          json.push(...tweets);
          response.status(200).json(json);
        })
        .catch((err) => {
          response.status(400).json({
            message: "Cannot process request at this time",
          });
        });
    } else {
      response.status(400).json({
        message: "Cannot process request at this time",
      });
    }
  });
};
