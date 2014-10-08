// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'express' module
var express = require('express');

// Create a new Express application instance
var app = express();

// Mount a new middleware function
app.use('/', function(req, res) {
	// Use the 'response' object to send a respone
	res.send('Hello World');
});

// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;