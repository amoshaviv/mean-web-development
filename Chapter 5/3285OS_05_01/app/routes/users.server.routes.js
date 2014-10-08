// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'users' controller
var users = require('../../app/controllers/users.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'users' base routes 
	app.route('/users')
	   .post(users.create)
	   .get(users.list);

	// Set up the 'users' parameterized routes
	app.route('/users/:userId')
	   .get(users.read)
	   .put(users.update)
	   .delete(users.delete);

	// Set up the 'userId' parameter middleware
	app.param('userId', users.userByID);
};