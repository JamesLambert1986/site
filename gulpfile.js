'use strict';

var gulp = require('gulp');
var HubRegistry = require('gulp-hub');
const { watch } = require('gulp');

// load some files into the registry
var hub = new HubRegistry(['gulp/*.js']);

// tell gulp to use the tasks just loaded
gulp.registry(hub);

// define the tasks needed to init
gulp.task('public', 
  gulp.series(
    'clean',
    'assets',
    'stylesheets',
    'scripts'
  )
);

// define the default tasks 'npm start'
gulp.task('default', 
  gulp.series(
    'public',
    'server',
    'watch'
  )
);

// Define our watch tasks
gulp.task('watch', function() {
  
  watch(['app/assets/sass/**/*'], gulp.parallel('stylesheets'));

  watch([
    'app/assets/scripts/modules/**',
    'app/assets/scripts/scripts*.js',
  ], gulp.series('scripts'));

  watch([
    'app/assets/images/**',
    'app/assets/system_images/**',
    'app/assets/prototype_images/**',
    'app/assets/scripts/libs/**',
    'app/assets/scripts/standalone/**',
    'app/assets/scripts/system/**',
    'app/assets/svg/**',
    'app/assets/css_tests/**'
  ], gulp.parallel('assets'));
});


// define the build tasks
gulp.task('build', 

  gulp.series(
    'public',
    'move-assets',
    'static'
  )
);

// define our audit
gulp.task('audit',

  gulp.series(
    'build',
    'audit-html',
    'audit-html-accessibility',
    'audit-css',
    'audit-css-stats',
    'audit-js-size',
    'audit-assets',
    'audit-summary'
  )
);


// define our unit tests
gulp.task('unit-tests', 
  
  gulp.series(
    'unit-tests-js',
    'unit-tests-sass',
    'unit-tests-css',
    'unit-tests-xml-json',
    'unit-tests-css-xml-json',
    'unit-tests-sass-xml-json'
  )
);

// define our audit
gulp.task('visual-regression', 
  
  gulp.series(
  'server',
  'audit-visual-regression-clean',
  'audit-visual-regression-run',
  'audit-visual-regression-move-timestamp-folder-images',
  'audit-visual-regression-remove-timestamp-folder',
  )
);

// define pull request
gulp.task('pull-request', 
  
  gulp.series(
  'visual-regression',
  'unit-tests',
  'audit'
  )
);

// define approve
gulp.task('approve', 
  
  gulp.series(
    'visual-regression-approve-clean',
    'visual-regression-approve'
  )
);



// Creates a static version of the prototype folder
// We still use the public folder for the assets we need to run that task
// Then we cleanup and the write the html files
gulp.task('static', 
  
  gulp.series(
    'build',
    'static-clean',
    'static-assets',
    'static-move-sw',
    'static-stylesheets-min',
    'static-scripts-min',
    'static-html'
  )
);
