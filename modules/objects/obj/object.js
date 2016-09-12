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

    sharedPgClient.query('SELECT * FROM tests', function(err, result) {

        //if (err) throw err;

        for(var i=0;i<result.length;i++){
            console.log(result.rows[i]);
        }
        callback(err, JSON.stringify(result));

    });
};

object.prototype.post = function(params, callback) {

    /* POST writes to Master DB in West Coast Private Space -a oregon-db  */
    request
  .post('https://oregon-db.herokuapp.com/api/v1/test/' + params.inputString)
  .send({ public: true, body: params.commentText })
  .set('Accept', 'application/json')
  .end(function(err, res){
    if(err) {
        console.log("err",err);
    }
  });
};

module.exports = object;
