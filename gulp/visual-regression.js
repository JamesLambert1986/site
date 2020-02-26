var gulp = require('gulp')
var fs = require('fs')
var write_md = require('../app/local_node_modules/write_md.js');
const backstop = require('backstopjs');

var clean = require('gulp-clean')

var nunjucks = require('nunjucks')
nunjucksAppEnv = nunjucks.configure(['./app/views']); // Fix the views folder as we aren't in the app folder now

var utils = require('../app/utils.js')
utils.addNunjucksFilters(nunjucksAppEnv)


// Visual Regression

gulp.task('audit-visual-regression-run', function(done) {

  var backstopconfig = fs.readFileSync('backstop.json', 'utf8')
  backstopconfig = JSON.parse(backstopconfig);

  // Manipulate the scenarios to only include tests that are in the regression json file
  let scenario_template = backstopconfig.scenarios[0];
  let visualtests = []
  let scenarios = []

  // Check the kitchen sink for new tests
  let site = [];

  let locals = [];
  locals["site"] = site;
  locals["get"] = {"rebrand":"true"};

  var page = fs.readFileSync('./app/views/kitchen-sink/index.md', 'utf8')
  var data = write_md.load(page, locals, true);
  
  var layout = fs.readFileSync('./app/views/kitchensink.html', 'utf8')
  var kitchensink_html = nunjucks.renderString(layout,data);
  
  kitchensink_html.replace(/data-test="([^"]*)"/gim, function(match, p1){
      
    visualtests.push(".visual-test#"+p1);
  });

  for(let i= 0; i < visualtests.length; i++){
    
    const key = i 
    scenario = scenario_template;

    scenario['label'] = visualtests[key].replace(".visual-test#","");
    scenario['selectors'] = visualtests[key];
    scenario['url'] =  "http://localhost:3000/kitchen-sink?selector="+visualtests[key].replace(".visual-test#","");

    scenarios[key] = JSON.stringify(scenario,null,2);
  }

  for(let i= 0; i < scenarios.length; i++){
    scenarios[i] = JSON.parse(scenarios[i]);
  }
  
  backstopconfig.scenarios = scenarios;

  // Run backstop test
  backstop('test', {config: backstopconfig}).then(() => { done(); }).catch(() => { done(); });

});






// We move the images out of the pre-compiled timestamp folder into the bitmaps_test folder so that we can source control the test images.
// i.e. if an image has changed because the test is affected. It is then highlighted in the pull request
gulp.task('audit-visual-regression-move-timestamp-folder-images', function(done) {

  var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist);
      }
      else {
        filelist.push(dir + '/' + file);
      }
    });
    return filelist;
  };

  var filelist = walkSync('./backstop_data/bitmaps_test');

  for (var i = filelist.length - 1; i >= 0; i--) {
    var file = filelist[i];

    var new_file = file.replace(/\/bitmaps_test\/.*\//g, "/bitmaps_test/");

    fs.rename(file, new_file, function(err) {
        if (err) throw err;
        console.log(file + ' moved');
    });
  }

  var html_report = fs.readFileSync('backstop_data/html_report/config.js', 'utf8')
  var html_report_fixed = html_report.replace(/\/bitmaps_test\/.*\//g, "/bitmaps_test/");

  fs.writeFile('backstop_data/html_report/config.js', html_report_fixed, (err) => {  if (err) throw err; done(); });

});

gulp.task('audit-visual-regression-remove-timestamp-folder', function(done) {

  files = fs.readdirSync('./backstop_data/bitmaps_test');

  files.forEach(function(file) {
    if (fs.statSync('./backstop_data/bitmaps_test' + '/' + file).isDirectory()) {
      
      fs.rmdirSync('./backstop_data/bitmaps_test' + '/' + file);
    }
  });

  done()
});



gulp.task('audit-visual-regression-clean', function () {
  return gulp.src('backstop_data/bitmaps_test/*', {read: false})
  .pipe(clean())
})


gulp.task('visual-regression-approve-clean', function () {
  return gulp.src('backstop_data/bitmaps_reference/*', {read: false})
  .pipe(clean())
})

gulp.task('visual-regression-approve', function (done) {
  // Due to the changes made for the build process we can not just use backstop approve
  // Instead we move the files form the test folder here.


  // Copy files from test folder into reference
  var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist);
      }
      else {
        filelist.push(dir + '/' + file);
      }
    });
    return filelist;
  };

  var filelist = walkSync('./backstop_data/bitmaps_test');

  for (var i = filelist.length - 1; i >= 0; i--) {
    var file = filelist[i];
    if(!file.includes("failed_diff")){
      var new_file = file.replace("/bitmaps_test/", "/bitmaps_reference/");

      fs.copyFile(file, new_file, (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
      });

    }
    else {
      fs.unlink(file, (err) => { if (err) throw err; })
    }
  }

  // Copy the summary into summary-develop
  /*
  fs.copyFile('./audit/summary.json', './audit/summary-develop.json', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
  */
})



