// Invoke 'strict' JavaScript mode
'use strict';

// Define the Grunt configuration method
module.exports = function(grunt) {
	// Initialize Grunt configuraiton
	grunt.initConfig({
		// Configure the grunt-env task
		env: {
			test: {
				NODE_ENV: 'test'
			},
			dev: {
				NODE_ENV: 'development'
			}
		},
		// Configure the grunt-nodemon task
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					ext: 'js,html',
					watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
				}
			},
			debug: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
				}
			}
		},
		// Configure the grunt-mocha-test task
		mochaTest: {
			src: 'app/tests/**/*.js',
			options: {
				reporter: 'spec'
			}
		},
		// Configure the grunt-karma task
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		// Configure the grunt-protractor-runner task
		protractor: {
			e2e: {
				options: {
					configFile: 'protractor.conf.js'
				}
			}
		},
		// Configure the grunt-contrib-jshint task
		jshint: {
			all: {
				src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js'],
				options: {
					node: true,
					predef: [
						"define",
						"require",
						"exports",
						"module",
						"describe",
						"before",
						"beforeEach",
						"after",
						"afterEach",
						"it",
						"inject",
						"expect"
					]
				}
			}
		},
		// Configure the grunt-contrib-csslint task
		csslint: {
			all: {
				src: 'public/modules/**/*.css'
			}
		},
		// Configure the grunt-contrib-watch task
		watch: {
			js: {
				files: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js'],
				tasks: ['jshint']
			},
			css: {
				files: 'public/modules/**/*.css',
				tasks: ['csslint']
			}
		},
		// Configure the grunt-concurrent task
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			},
			debug: {
				tasks: ['nodemon:debug', 'watch', 'node-inspector'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		// Configure the grunt-node-inspector task
		'node-inspector': {
			debug: {}
		}
	});

	// Load the external Grunt tasks
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-node-inspector');

	// Create the 'default' Grunt task
	grunt.registerTask('default', ['env:dev', 'lint', 'concurrent:dev']);

	// Create the 'debug' Grunt task
	grunt.registerTask('debug', ['env:dev', 'lint', 'concurrent:debug']);

	// Create the 'test' Grunt task
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma', 'protractor']);

	// Create the 'lint' Grunt task
	grunt.registerTask('lint', ['jshint', 'csslint']);
};