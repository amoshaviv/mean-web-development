// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

// Create the Local strategy configuration method
module.exports = function() {
	// Use the Passport's Local strategy 
	passport.use(new LocalStrategy(function(username, password, done) {
		// Use the 'User' model 'findOne' method to find a user with the current username
		User.findOne({
			username: username
		}, function(err, user) {
			// If an error occurs continue to the next middleware
			if (err) {
				return done(err);
			}
			
			// If a user was not found, continue to the next middleware with an error message
			if (!user) {
				return done(null, false, {
					message: 'Unknown user'
				});
			}

			// If the passport is incorrect, continue to the next middleware with an error message
			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			
			// Otherwise, continue to the next middleware with the user object
			return done(null, user);
		});
	}));
};