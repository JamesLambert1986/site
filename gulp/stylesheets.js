var config = require('./config.json')
var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var rename = require("gulp-rename")
var replace = require('gulp-replace');

// We process of SCSS files into css files and save them into the public folder
gulp.task('stylesheets', function () {
  return gulp.src(config.paths.assets + '/sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded',}).on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
  // Create a file fors us to tests psuedo classes
  .pipe(replace(':hover', '.hover'))
  .pipe(replace(':focus', '.focus'))
  .pipe(replace(':active', '.active'))
  .pipe(rename(function (path) {
    path.basename += "-test";
  }))
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})