// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' module E2E test suite
describe('Articles E2E Tests:', function() {
	// Test the new article page
	describe('New Article Page', function() {
		it('Should not be able to create a new article', function() {
			// Load the new article page
			browser.get('http://localhost:3000/#!/articles/create');

			// Get the submit button
			element(by.css('input[type=submit]')).click();

			// Get the error message element
			element(by.binding('error')).getText().then(function(errorText) {
				// Check the error message text
				expect(errorText).toBe('User is not logged in');
			});
		});
	});
});