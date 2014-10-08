// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'http' module
var http = require('http');

// Use the 'http' module to create a new web server
http.createServer(function(req, res) {
	// Use the 'response' object to write the 'content-type' response header
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	// Use the 'response' object to write a response body and end the request
	res.end('Hello World');
}).listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');