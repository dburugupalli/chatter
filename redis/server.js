const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3000,
  cors = require("cors");
const jwt = require('./api/utils/jwt');
const errorHandler = require("./api/utils/error_handler");
// enable cors
app.use(cors());
app.use(jwt());
app.use(errorHandler);
//Adding body parser for handling request and response objects.
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//Initialize app
let initApp = require("./api/app");
initApp(app);

app.listen(port);
console.log(`ChatterApp Redis server started on: ${port}`);