var _ = require("lodash"),
async = require("async"),
pg = require("pg");
request = require("superagent"),
superagent = require("request");

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

  sharedPgClient.query('SELECT * FROM tests', function(err, result) {

        //if (err) throw err;

        for(var i=0;i<result.length;i++){
          console.log(result.rows[i]);
        }
        callback(err, JSON.stringify(result));

      });
};

object.prototype.post = function(params, callback) {

  if (process.env.IS_LEADER == 'TRUE') {
    console.log("tru",process.env.IS_LEADER);
    console.log(params.inputString);
    sharedPgClient.query('INSERT INTO tests (name) values ($1)',[params.inputString], function(err, result) {
        console.log("Post Params: ");
        console.log(params);
        var err = undefined;
        callback(err, params);
    });
  } else {
    console.log(process.env.IS_LEADER);
    console.log(params.inputString);
    superagent.post('http://oregon-db.herokuapp.com/api/v1/test/' + params.inputString,params, function (err, response, body) {
      if(err) {
        console.log("err",err);
      } else {
        console.log(body)
      }

    }
    );
  }

};

module.exports = object;
