var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var config= {
  port: process.env.PORT || 1111,
  description: "Your App's REST Backend",
  title: "Westcost Example API"
};


// Initialize REST API Server Backend
console.log("Initializing REST Server");
var restServer = require("./modules/restServer.js").create(app, config);

// Set your application route
console.log("Set Main application Route");
app.get("/", function(req, res) {
  res.send('My application is powered by <a href="docs">Matts API</a>!');
});

// Add your REST plugins here
console.log("Initialize CSA Endpoints");
var routes = require("./modules/routes");
console.log("routes");
console.log(routes);

routes.addToRestServer(restServer);

// Launch Your Application
console.log("Launch Application");
var server = app.listen(config.port, function () {
  console.log('App running: http://%s:%s', server.address().address, server.address().port);
});
