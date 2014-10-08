// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');

// Define the Socket.io configuration method
module.exports = function(server, io, mongoStore) {
	// Intercept Socket.io's handshake request
    io.use(function(socket, next) {
    	// Use the 'cookie-parser' module to parse the request cookies
        cookieParser(config.sessionSecret)(socket.request, {}, function(err) {
        	// Get the session id from the request cookies
            var sessionId = socket.request.signedCookies['connect.sid'];

            // Use the mongoStorage instance to get the Express session information
            mongoStore.get(sessionId, function(err, session) {
            	// Set the Socket.io session information
                socket.request.session = session;

                // Use Passport to populate the user details
                passport.initialize()(socket.request, {}, function() {
                	passport.session()(socket.request, {}, function() {
                		if (socket.request.user) {
                			next(null, true);
                		} else {
                			next(new Error('User is not authenticated'), false);
                		}
                	});
                });
            });
        });
    });
	
	// Add an event listener to the 'connection' event
    io.on('connection', function(socket) {
    	// Load the chat controller
        require('../app/controllers/chat.server.controller')(io, socket);
    });
};