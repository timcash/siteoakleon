var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var usemin = require('gulp-usemin');
var less = require('gulp-less');
var path = require('path');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

gulp.task('less', function () {
  gulp.src('./less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('usemin', function() {
  gulp.src('./index.html')
    .pipe(usemin({
      cssmin: false,
      htmlmin: false,
      jsmin: false
    }))
    .pipe(gulp.dest('build/'));
});

// We'll need a reference to the tinylr
// object to send notifications of file changes
var lr;
function startLivereload() {
 
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

// Let's make things more readable by
// encapsulating each part's setup
// in its own method
function startExpress() {
 
  var express = require('express');
  var app = express();
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}

// Lint Task
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watch our html
gulp.task('html', function() {
    gulp.src('./index.html')
        .pipe(livereload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['lint', 'scripts']);
    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./index.html', ['html']);
});

// Default Task
gulp.task('default', ['lint', 'less', 'scripts', 'watch'], function(){

	startExpress();
});