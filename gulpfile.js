console.log('=== add gulp task ===');
var jslint = require('gulp-jslint'),
	gulp = require('gulp');

gulp.task('jslint', function() {
	return gulp.src([
		'./src/*.js',
		'./*.js'
	]).pipe(jslint({
		node: true,
		nomen: true,
		sloppy: true,
		plusplus: true,
		unparam: true,
		stupid: true
	}));
});

gulp.task('default', ['jslint']);