// Invoke 'strict' JavaScript mode
'use strict';

// Create the Socket.io wrapper service
angular.module('chat').service('Socket', ['Authentication', '$location', '$timeout',
    function(Authentication, $location, $timeout) {
    	// Connect to the Socket.io server only when authenticate
        if (Authentication.user) {
            this.socket = io();
        } else {
            $location.path('/');
        }

        // Wrap the Socket.io 'on' method
        this.on = function(eventName, callback) {
            if (this.socket) {
                this.socket.on(eventName, function(data) {
                    $timeout(function() {
                        callback(data);
                    });
                });
            }
        };

        // Wrap the Socket.io 'emit' method
        this.emit = function(eventName, data) {
            if (this.socket) {
                this.socket.emit(eventName, data);
            }
        };

        // Wrap the Socket.io 'removeListener' method
        this.removeListener = function(eventName) {
            if (this.socket) {
                this.socket.removeListener(eventName);
            }
        };
    }
]);
