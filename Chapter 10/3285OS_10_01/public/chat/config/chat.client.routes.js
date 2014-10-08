// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'chat' module routes
angular.module('chat').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/chat', {
			templateUrl: 'chat/views/chat.client.view.html'
		});
	}
]); 
