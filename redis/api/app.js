"use strict";
module.exports = function (app) {
  //Initialize routes
  let tweetRoutes = require("./routes/tweet-route");
  let userRoutes = require("./routes/user-route");
  tweetRoutes(app);
  userRoutes(app);
};
