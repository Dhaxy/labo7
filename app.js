var express = require('express'),
		app = express(),
		port = process.env.PORT || 3000,
		users = require('./stockage/users');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var routes = require('./routes/routes');
routes(app);

console.log('API listening on ' + port);

module.exports = app;