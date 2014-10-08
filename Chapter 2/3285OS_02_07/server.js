// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'connect' module
var connect = require('connect');

// Create a new 'connect' application instance
var app = connect();

// Define a new 'logger' middleware function
var logger = function(req, res, next) {
	// Log request information to the console
	console.log(req.method, req.url);

	// Call the next middleware
	next();
};

// Define a new 'helloWorld' middleware function
var helloWorld = function(req, res, next) {
	// Use the 'response' object to write the 'content-type' response header
	res.setHeader('Content-Type', 'text/plain');

	// Use the 'response' object to write a response body and end the request
	res.end('Hello World');
};

// Define a new 'goodbyeWorld' middleware function
var goodbyeWorld = function(req, res, next) {
	// Use the 'response' object to write the 'content-type' response header
	res.setHeader('Content-Type', 'text/plain');

	// Use the 'response' object to write a response body and end the request
	res.end('Goodbye World');
};

// Configure the 'connect' application instance to use the 'logger' middleware
app.use(logger);

// Mount the 'connect' application instance to use the 'helloWorld' middleware
app.use('/hello', helloWorld);

// Mount the 'connect' application instance to use the 'goodbyeWorld' middleware
app.use('/goodbye', goodbyeWorld);

// Use the 'connect' application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');