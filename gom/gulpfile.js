// grab our gulp packages
var gulp       = require('gulp'),
    jshint     = require('gulp-jshint'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

// define the default task and add watch to it
gulp.task('default', ['watch']);

// jshint lint
gulp.task('jshint', function() {
   return gulp.src([
         'app/**/*.js',
         '!app/bower_components/**'
      ])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

// sass compilation
gulp.task('build-css', function() {
   return gulp.src('app/css/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app/css'));
});

// watchers
gulp.task('watch', function() {
   gulp.watch([
                 'app/**/*.js',
                 '!app/bower_components/**'
              ],
              ['jshint']);
   gulp.watch(['app/css/**/*.scss'], ['build-css']);
});
