var config = require('./config.json')
var gulp = require('gulp')
var clean = require('gulp-clean')

// Empty the public folder ready to re-populate from the app folder
gulp.task('clean', () => {
  return gulp.src([config.paths.public + '/*',config.paths.build + '/*'], {read: false})
  .pipe(clean())
})