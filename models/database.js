var pg = require('pg');
var connectionString = process.env.DATABASE_URL;
pg.defaults.ssl = true;
/*pg.connect(connectionString, function(err, client) {
	if (err) throw err;
	console.log('Connected to postgres');
	client.query('SELECT ')
});*/
var client = new pg.Client(connectionString);
client.connect();
var query = client.query;
