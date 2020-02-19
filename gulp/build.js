var config = require('./config.json')
var gulp = require('gulp')
// Copy the public folder excluding stylesheets and scripts which need a seperate build task
// as we are doing extra stuff to the files
gulp.task('move-assets', () => {
  return gulp.src([
    config.paths.public + '/**'
  ])
  .pipe(gulp.dest(config.paths.build_assets))
})
