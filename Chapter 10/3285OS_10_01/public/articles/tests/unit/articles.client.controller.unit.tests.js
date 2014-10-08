// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' module unit test suite
describe('Testing Articles Controller', function() {
	// Define global variables
	var _scope, ArticlesController;

	// Define a pre-tests function
	beforeEach(function() {
		// Load the 'mean' module
		module('mean');

		// Add a new Jasmine matcher
		jasmine.addMatchers({
			toEqualData: function(util, customEqualityTesters) {
				return {
					compare: function(actual, expected) {
						return {
							pass: angular.equals(actual, expected)
						};
					}
				};
			}
		});

		// Use the 'inject' method to inject services
		inject(function($rootScope, $controller) {
			// Create a mock scope object
			_scope = $rootScope.$new();

			// Create a new mock controller
			ArticlesController = $controller('ArticlesController', {
				$scope: _scope
			});
		});
	});

	// Test the 'find' method
	it('Should have a find method that uses $resource to retrieve a list of articles', inject(function(Articles) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend) {
			// Create a sample article
			var sampleArticle = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample articles list
			var sampleArticles = [sampleArticle];

			// Define a request assertion
			$httpBackend.expectGET('api/articles').respond(sampleArticles);

			// Call the controller's 'find' method
			_scope.find();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.articles).toEqualData(sampleArticles);
		});
	}));

	// Test the 'findOne' method
	it('Should have a findOne method that uses $resource to retreive a single of article', inject(function(Articles) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend, $routeParams) {
			// Create a sample article
			var sampleArticle = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the 'articleId' route parameter
			$routeParams.articleId = 'abcdef123456789012345678';

			// Define a request assertion
			$httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

			// Call the controller's 'findOne' method
			_scope.findOne();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.article).toEqualData(sampleArticle);
		});
	}));
});