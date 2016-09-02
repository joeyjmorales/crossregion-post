var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query;
