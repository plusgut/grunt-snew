var tempart = require('tempart');

module.exports = function(grunt) {
	grunt.registerMultiTask('vood', 'Concatenate files.', function() {
		// @TODO add sourcemap
		var target = this.target;
		var container = '';
		this.files.forEach(function(task) {
			task.src.forEach(function(file) {
				grunt.log.writeln('Working on: ' + file);

				if(target == 'templates') {
					var template = grunt.file.read(task.cwd + '/' + file);
					var parsedTemplate = tempart.parse(template);
					var path = file.split('/');
					path.pop();
					var containerTemplate = 'vood.Template("' + path.join('/') + '", ' + JSON.stringify( parsedTemplate ) + ');';
					container += containerTemplate + "\n";
				} else {
					container += grunt.file.read(task.cwd + '/' + file);
				}
			});

			grunt.file.write(task.dest, container);
		});

	});
};
