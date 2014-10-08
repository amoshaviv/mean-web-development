// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'express' module
var express = require('express');

// Create a new Express application instance
var app = express();

// Create a new 'hasName' middleware function
var hasName = function(req, res, next) {
	// Use the QueryString 'name' parameter to decide on a proper response
	if (req.param('name')) {
		// If a 'name' parameter exists it will call the next middleware
		next();
	} else {
		// If a 'name' parameter does not exists it will return a proper response 
		res.send('What is you name?');
	}
};

// Create a new 'sayHello' middleware function
var sayHello = function(req, res, next) {
	// Use the 'response' object to send a respone with the 'name' parameter 
	res.send('Hello ' + req.param('name'));
};

// Mount both middleware funcitons
app.get('/', hasName, sayHello);

// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;