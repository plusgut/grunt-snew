var tempart = require('tempart');

module.exports = function(grunt) {
	grunt.registerMultiTask('vood', 'Concatenate files.', function() {
		// @TODO add sourcemap
		var target = this.target;
		var container = '';
		this.files.forEach(function(task) {
			task.src.forEach(function(file) {
				grunt.log.writeln('Working on: "' + file);

				if(target == 'templates') {
						console.log('template!');
					var template = grunt.file.read(file);
					var parsedTemplate = tempart.parse(template);
					var containerTemplate = 'vood.Template({' + file + ', ' + JSON.stringify( parsedTemplate ) + '});';
					container += containerTemplate + "\n";
				} else {
					console.log('nope');
					container += grunt.file.read(file);
				}
			});
			grunt.file.write(task.dest, container);
		});

	});
};
