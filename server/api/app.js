"use strict";
module.exports = function (app) {
  //Initialize models
  const tweetModel = require("./models/tweet");
  const userModel = require("./models/user");
  //Initialize routes
  let tweetRoutes = require("./routes/tweet-route");
  let userRoutes = require("./routes/user-route");
  tweetRoutes(app);
  userRoutes(app);
};
