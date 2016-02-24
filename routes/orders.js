var express = require('express');
var router = express.Router();
var pg = require('pg');

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/joins_challenge';
}

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM products');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            console.log(results);
            return res.json(results);

        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;