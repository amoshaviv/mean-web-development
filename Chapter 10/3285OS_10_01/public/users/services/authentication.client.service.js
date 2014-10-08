// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Authentication' service
angular.module('users').factory('Authentication', [
	function() {
		// Use the rendered user object
		this.user = window.user;

		// Return the authenticated user data
		return {
			user: this.user
		};
	}
]);