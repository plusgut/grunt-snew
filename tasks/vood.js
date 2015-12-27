var tempart = require('tempart');

module.exports = function(grunt) {
	grunt.registerMultiTask('snew', 'Concatenate files.', function() {
		var options = this.options();
		if(options.lib) {
			var filePath = __dirname + '/../node_modules/snew/dist/snew.js';
			if(!grunt.file.exists(filePath)) {
				filePath = __dirname + '/../node_modules/snew/dist/snew.min.js'
			}
			var snew = grunt.file.read(filePath);
			grunt.file.write(options.lib, snew);
		} else {
			grunt.fail.warn('The options object should contain a lib property with the path to dest/snew.js');
		}

		// @TODO add sourcemap
		var target = this.target;
		var container = "require(['snew/app'], function(snew) {window.snew = snew;\n";
		this.files.forEach(function(task) {
			task.src.forEach(function(file) {
				grunt.log.writeln('Working on: ' + file);

				if(task.template) {
					var template = grunt.file.read(task.cwd + '/' + file);
					var parsedTemplate = tempart.parse(template);
					var path = file.split('/');
					path.pop();
					var containerTemplate = 'snew.Template("' + path.join('/') + '", ' + JSON.stringify( parsedTemplate ) + ');';
					container += containerTemplate + "\n";
				} else {
					container += grunt.file.read(task.cwd + '/' + file);
				}
				container += "\n";
			});
			
			
		});

		container += "\n});";

		if(options.app) {
			grunt.file.write(options.app, container);
		} else {
			grunt.fail.warn('The options object should contain a app property with the path to dest/app.js');
		}
		
	});
};
