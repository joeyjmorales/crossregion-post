var _ = require("lodash"),
    async = require("async"),
    pg = require("pg");
    request = require("superagent");

pg.defaults.ssl = true;

var dbString = process.env.DATABASE_URL;
console.log("Connecting to Postgres: " + dbString);

var sharedPgClient;

pg.connect(dbString, function(err,client){

    if(err){
        console.error("PG Connection Error")
    }

    console.log("Connected to Postgres");
    sharedPgClient = client;

});

var object = function(params){};

object.prototype.get = function(params, callback) {
	sharedPgClient.query('SELECT * FROM accounts', function(err, result) {
		if (err) throw err;
		console.log(result.rows[0]);
	});
};

module.exports = object;