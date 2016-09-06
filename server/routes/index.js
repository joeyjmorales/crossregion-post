var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
pg.defaults.ssl = true;

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});



router.get('/api/v1/tests', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          console.log('test');
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM tests ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.post('/api/v1/tests', function(req,res) {
	var result;
	
	// get http data
	var data = {text: req.body.text, complete: false};

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log('test');
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
			// insert into table
			client.query("INSERT INTO tests(name) values($1)", [data.text]);

			result = client.query("SELECT * FROM tests order by id desc limit 1");

			query.on('end', function() {
				done();
				return res.json(result);
			});
	});
});

module.exports = router;