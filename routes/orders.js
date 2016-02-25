var express = require('express');
var router = express.Router();
var pg = require('pg');

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/joins_challenge';
}

router.get('/:id', function(req, res) {

    var customerId = req.params.id;
    console.log(customerId);

    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM addresses JOIN orders ON orders.address_id=addresses.id JOIN line_items ON orders.id=line_items.order_id JOIN products ON products.id=line_items.product_id WHERE addresses.customer_id= $1 ORDER BY order_date ASC; ',
        [customerId]);

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

// ('SELECT * FROM addresses
// JOIN orders ON
// orders.address_id=addresses.id
// JOIN line_items
// ON orders.id=line_items.order_id
// JOIN products
// ON products.id=line_items.product_id
// WHERE addresses.customer_id= 1; ')
