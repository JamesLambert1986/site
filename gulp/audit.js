var pjson = require('./../package.json');
var gulp = require('gulp')
var fs = require('fs')

// Summary
gulp.task('audit-summary', function(done) {

  var summary = {};

  var today = new Date();
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();

  summary['date'] = date+' '+time;
  var css_stats = fs.readFileSync('audit/css_stats.json', 'utf8')
  css_stats = JSON.parse(css_stats);

  var css_validation = fs.readFileSync('audit/css_validation.json', 'utf8')
  css_validation = JSON.parse(css_validation);

  var sass_unit_tests = fs.readFileSync('audit/sass_unit_tests.json', 'utf8')
  sass_unit_tests = JSON.parse(sass_unit_tests);

  var css_unit_tests = fs.readFileSync('audit/css_unit_tests.json', 'utf8')
  css_unit_tests = JSON.parse(css_unit_tests);

  summary['version'] = pjson.version;

  summary['html'] = {};
  //summary['html']['validation_errors'] = html_validation['messages'].length;
  //summary['html']['accessibility_issues'] = html_accessibility['issues'].length;
  
  summary['css'] = {};
  summary['sass'] = {};
  summary['rebrand_css'] = {};
  summary['css']['size'] = css_stats.humanizedSize;
  
  summary['css']['validation_errors'] = css_validation['errors'].length;
  summary['css']['unit_tests_errors'] = css_unit_tests.$.failures;
  summary['css']['unit_tests_total'] = css_unit_tests.$.tests;
  summary['sass']['unit_tests_errors'] = sass_unit_tests.$.failures;
  summary['sass']['unit_tests_total'] = sass_unit_tests.$.tests;
  
  summary['js'] = {};

  summary['assets'] = {};
  
  // We get the stats from the pre-existing backstop test results
  var audit_visual = fs.readFileSync('backstop_data/html_report/config.js', 'utf8')
  audit_visual = audit_visual.replace(/report\(\{/m, '{')
  audit_visual = audit_visual.replace(/}\);/m, '}')
  audit_visual = JSON.parse(audit_visual);
  
  var visual_passes = 0
  var visual_fails = 0

  Object.keys(audit_visual.tests).forEach(function (key) {
    var test = audit_visual.tests[key]
    
    if(test.status == "pass"){
      visual_passes = visual_passes+1;
    }
    else {
      visual_fails = visual_fails+1;
    }
  });
  

  summary['visual_regression'] = {};
  summary['visual_regression']['tests'] = visual_fails + visual_passes;
  summary['visual_regression']['affected'] = visual_fails;
  summary['visual_regression']['unaffected'] = visual_passes;

  // Write a summary used for pull requests
  fs.writeFile('audit/summary.json', JSON.stringify(summary,null,2), (err) => {  if (err) throw err; done(); });
});
