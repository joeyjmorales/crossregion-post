function addToRestServer(restServer, envConfig) {
	var routes = require("./objects/obj/rest.js")(envConfig || {});
	restServer.get(routes.get);
}

module.exports.addToRestServer = addToRestServer;