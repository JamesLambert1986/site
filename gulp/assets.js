var config = require('./config.json')
var gulp = require('gulp')

// Copy assets from the app folder to the public folder
gulp.task('assets', (done) => {
  gulp.src([
    config.paths.assets + '/**',
    '!' + config.paths.assets + 'sass{,/**/*}',
    '!' + config.paths.assets + 'scripts/{,/*}',
    '!' + config.paths.assets + 'scripts/modules/{,/**/*}'
  ])
  .pipe(gulp.dest(config.paths.public));
  done();
})
