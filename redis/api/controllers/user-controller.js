const fetch = require("node-fetch");
const serverName = process.env.BACKEND_SERVER_NAME;
const baseUrl = `http://${serverName}:5000/v1`;
const client = require('prom-client');
const counter = new client.Counter({
  name: 'metric_name',
  help: 'metric_help'
});
// routes
exports.register = async function register(req, res, _next) {
  counter.inc();
  const promise = await fetch(`${baseUrl}/register`, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  });
  if (promise.status == 200) {
    res.status(201).json({
      message: "User Registered successfully",
    });
  } else {
    res.status(400).json({
      message: "Some issue occurred while registering the user",
    });
  }
};

exports.authenticate = async function authenticate(req, res, _next) {
  const promise = await fetch(`${baseUrl}/authenticate`, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  });

  if (promise.status == 200) {
    const user = await promise.json();
    res.status(200).json(user);
  } else {
    res.status(promise.status).json({
      message: "Invalid username or password",
    });
  }
};
