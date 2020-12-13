const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3000,
  cors = require("cors");
const jwt = require('./api/utils/jwt');
const errorHandler = require("./api/utils/error_handler");
// Use the prom-client module to expose our metrics to Prometheus
const client = require('prom-client');
 
// enable prom-client to expose default application metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'my_application:' });
 
// a custom histogram metric which represents the latency
// of each call to our API /api/greeting.
const histogram = new client.Histogram({
  name: 'my_application:hello_duration',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});
app.use('/v1/greeting', (request, response) => {
  // start the timer for our custom metric - this returns a function
  // called later to stop the timer
  const end = histogram.startTimer();
  const name = request.query.name ? request.query.name : 'World';
  response.send({content: `Hello, ${name}!`});
  // stop the timer
  end({ method: request.method, 'status_code': 200 });
});
 
// expose our metrics at the default URL for Prometheus
app.get('/metrics', (request, response) => {
  response.set('Content-Type', client.register.contentType);
  response.send(client.register.metrics());
});
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
