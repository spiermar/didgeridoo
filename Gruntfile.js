module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'public/javascripts/boomerang.min.js': ['boomerang/boomerang.js', 'boomerang/plugins/rt.js', 'boomerang/plugins/bw.js', 'boomerang/plugins/navtiming.js']
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
};