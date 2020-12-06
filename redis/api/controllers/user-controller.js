const fetch = require("node-fetch");
const serverName = "localhost";
const baseUrl = `http://${serverName}:5000/v1`;

// routes
exports.register = async function register(req, res, _next) {
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
    res.status(400).json({
      message: "Some issue occurred while registering the user",
    });
  }
};
