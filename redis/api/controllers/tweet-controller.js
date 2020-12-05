"use strict";
const redis = require("redis");
const client = redis.createClient({
    host: "localhost",
    port: 6379
});

const myKey = "tweets";
client.set("key", myKey, redis.print);
client.get("key", redis.print);

const fetch = require("node-fetch");
const serverName = 'localhost';
const cacheTimeOut = 2;
const baseUrl = `http://${serverName}:5000/v1`;

// clears cache every cacheTimeOut minutes
setInterval(clearCache, 1000 * 60 * cacheTimeOut);

// Function used to clear cache after every cacheTimeOut minutes and calls the main backend to
// update the records
function clearCache() {
  // get the values from cache
  client.lrange(myKey, 0, -1, function (err, reply) {
    if (!err) {
      const tweets = reply.map(JSON.parse);
      if (tweets && tweets.length > 0) {
        // call the node server to dump the data
        fetch(`${baseUrl}/tweets`, {
          method: "POST",
          body: JSON.stringify(tasks),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((json) => console.log(json));
      }
    }
  });

  client.del(myKey);
}

/**
 * Creates a new task in cache with the request JSON and
 * returns success response.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.createTweet = function (request, response) {
  client.rpush([myKey, JSON.stringify(request.body)], function (err, _reply) {
    if (!err) {
      response.status(201).json(request.body);
    } else {
      response.status(400).json({
        message: "Unable to process the input",
      });
    }
  });
};

// /**
//  * Clears all tasks
//  * returns success response.
//  * @param {request} {HTTP request object}
//  * @param {response} {HTTP response object}
//  */

// exports.deleteTasks = (_request, response) => {
//   // clear the cache
//   client.del(myKey, function (err, reply) {
//     if (!err) {
//       // call backend api to clear the tasks
//       fetch(`${baseUrl}/tasks`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then(() =>
//           response.status(200).json({
//             message: "Tasks Deleted successfully",
//           })
//         );
//     }
//     console.log(reply);
//   });
// };

// // /**
// //  * Returns Updated Task response.
// //  *
// //  * @param request
// //  * @param response
// //  */
// exports.updateTask = (request, response) => {
//   let isFoundInCache = false;
//   // check if the doc exists in cache. If so update in the cache and return
//   // else update in the db
//   client.lrange(myKey, 0, -1, function (err, reply) {
//     if (!err) {
//       const tasks = reply.map(JSON.parse);
//       for (let i = 0; i < tasks.length; i++) {
//         let task = tasks[i];
//         if (task.uid == request.params.taskId) {
//           isFoundInCache = true;
//           task.completed = true;
//           client.del(myKey, function (err, reply) {
//             console.log(reply);
//           });
//           client.rpush([myKey, JSON.stringify(...tasks)], function (err, _reply) {
//             if (!err) {
//               response.status(200).json({
//                 message: "Task updated successfully",
//               });
//             } else {
//               response.status(400).json({
//                 message: "Unable to process the input",
//               });
//             }
//           });

//           break;
//         }
//       }

//       // if the task is not found in cache, you need to update the server
//       if (!isFoundInCache) {
//         // make a call to server api
//         fetch(`${baseUrl}/tasks/${request.params.taskId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//         })
//           .then((res) => res.json())
//           .then(() =>
//             response.status(200).json({
//               message: "Task updated successfully",
//             })
//           );
//       }
//     } else {
//       response.status(400).json({
//         message: "Cannot process request at this time",
//       });
//     }
//   });
// };

// // /**
// //  *
// //  * Returns all tasks.
// //  * @param {request} {HTTP request object}
// //  * @param {response} {HTTP response object}
// //  */
// exports.getTasks = (_request, response) => {
//   // Get the tasks from cache
//   client.lrange(myKey, 0, -1, function (err, reply) {
//     if (!err) {
//       const tasks = reply.map(JSON.parse);
//       // call the server api to fetch the previous results
//       fetch(`${baseUrl}/tasks`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then((json) => {
//            json.push(...tasks);
//           response.status(200).json(json);
//         });
//     } else {
//       response.status(400).json({
//         message: "Cannot process request at this time",
//       });
//     }
//   });
// };
