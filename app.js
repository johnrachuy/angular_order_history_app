var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var customers = require('./routes/customers');
var orders = require('./routes/orders');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/customers', customers);
app.use('/orders', orders);


app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/vendors'));
app.use(express.static('public/styles'));
app.use(express.static('public/scripts'));


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Marshmallows toasting on port ', app.get('port'));
});
