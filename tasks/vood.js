var tempart = require('tempart');

module.exports = function(grunt) {
	grunt.registerMultiTask('vood', 'Concatenate files.', function() {
		var lib = this.options().lib;
		if(lib) {
			var vood = grunt.file.read(__dirname + '/../node_modules/vood/dist/vood.js');
			grunt.file.write(lib, vood);
		} else {
			grunt.fail.warn('The options object should contain a lib property with the path to dest/vood.js');
		}

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
