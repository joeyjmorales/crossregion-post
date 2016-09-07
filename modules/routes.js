function addToRestServer(restServer, envConfig) {
	var routes = require("./objects/obj/rest.js")(envConfig || {});
	restServer.get(routes.get);
	restServer.post(routes.post);
}

module.exports.addToRestServer = addToRestServer;