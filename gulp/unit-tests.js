var gulp = require('gulp');
var Server = require('karma').Server;
var fs = require('fs')
var nunjucks = require('nunjucks')
var mocha = require('gulp-mocha')
require('mocha-junit-reporter')
nunjucksAppEnv = nunjucks.configure(['./app/views']); // Fix the views folder as we aren't in the app folder now

var utils = require('../app/utils.js')
utils.addNunjucksFilters(nunjucksAppEnv)



gulp.task('unit-tests-sass-print', function (done) {
  return gulp.src([__dirname + '/../unit_tests/sass.js'], {read: false})
  .pipe(mocha({
    ui: 'bdd'
  }))
  .once('error', err => {
    console.error(err);
    done();
  })
  .once('end', () => {
    done();
  })
});

gulp.task('unit-tests-sass-report', function (done) {
  return gulp.src([__dirname + '/../unit_tests/sass.js'], {read: false})
  .pipe(mocha({
    ui: 'bdd',
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
        mochaFile: __dirname + '/../audit/css_tests/sass.xml'
    }
  }))
  .once('error', err => {
    console.error(err);
    done();
  })
  .once('end', () => {
    done();
  })
});


gulp.task('unit-tests-sass', 
  
  gulp.series(
    'unit-tests-sass-print','unit-tests-sass-report'
  )
);

gulp.task('unit-tests-js', function (done) {
  Server.start({
    configFile: __dirname + '/../unit_tests/karma.conf.js',
    singleRun: true
  }, function() {
      done();
  });
});

gulp.task('unit-tests-css', function (done) {
  Server.start({
    configFile: __dirname + '/../unit_tests/karma-css.conf.js',
    singleRun: true
  }, function() {
      done();
  });
});


gulp.task('unit-tests-xml-json', function (done) {
  
  var fs = require('fs'),
  xml2js = require('xml2js');
 
  var parser = new xml2js.Parser();
  fs.readFile(__dirname + '/../audit/tests/results.xml', function(err, data) {

      parser.parseString(data, function (err, result) {

        fs.writeFile(__dirname + '/../audit/unit_tests.json', JSON.stringify(result.testsuite,null,2), (err) => {  if (err) throw err; });

        done()
      });
  });

});
gulp.task('unit-tests-css-xml-json', function (done) {
  
  var fs = require('fs'),
  xml2js = require('xml2js');
 
  var parser = new xml2js.Parser();

  fs.readFile(__dirname + '/../audit/css_tests/results.xml', function(err, data) {

    parser.parseString(data, function (err, result) {

      fs.writeFile(__dirname + '/../audit/css_unit_tests.json', JSON.stringify(result.testsuite,null,2), (err) => {  if (err) throw err; });

      done()
    });
  });
});

gulp.task('unit-tests-sass-xml-json', function (done) {
  
  var fs = require('fs'),
  xml2js = require('xml2js');
 
  var parser = new xml2js.Parser();

fs.readFile(__dirname + '/../audit/css_tests/sass.xml', function(err, data) {

  parser.parseString(data, function (err, result) {

    fs.writeFile(__dirname + '/../audit/sass_unit_tests.json', JSON.stringify(result.testsuites,null,2), (err) => {  if (err) throw err; });

    done()
  });
});

});
