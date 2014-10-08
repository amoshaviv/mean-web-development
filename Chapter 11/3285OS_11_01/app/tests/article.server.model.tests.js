// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article');

// Define global variables
var user, article;

// Create an 'Article' model test suite
describe('Article Model Unit Tests:', function() {
	// Define a pre-tests function
	beforeEach(function(done) {
		// Create a new 'User' model instance
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		// Save the new 'User' model instance
		user.save(function() {
			article = new Article({
				title: 'Article Title',
				content: 'Article Content',
				user: user
			});

			done();
		});
	});

	// Test the 'Article' model save method
	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			article.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save an article without a title', function() {
			article.title = '';
			
			article.save(function(err) {
				should.exist(err);
			});
		});
	});

	// Define a post-tests function
	afterEach(function(done) {
		// Clean the database
		Article.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});