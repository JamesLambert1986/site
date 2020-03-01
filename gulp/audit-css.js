var pjson = require('./../package.json');
var gulp = require('gulp')
var fs = require('fs')

var cssValidate = require('css-validator');
var getcssstats = require('../app/local_node_modules/getcssstats.js');



// CSS Validation
gulp.task('audit-css', function(done) {

  var css = fs.readFileSync('./public/stylesheets/styles.css', 'utf8')

  var cssoptions = {
    "profile": "css3",
    "text": css.replace(/(?<!\()--.+?;/g, '')
  }

  cssValidate(cssoptions, function (error, data) {
    
    if (error) { console.error(error) }

    
    var allowed_properties = ['fill','size', 'stroke','stroke-width','stroke-dasharray','stroke-dashoffset','stroke-linejoin','stroke-linecap','pointer-events','text-decoration-skip-ink']
    var css_errors = new Array();
    css_errors['allowed_properties'] = 'allowed_properties';
    Object.keys(data.errors).forEach(function (key) {
      
      let csserror = data.errors[key];
      let validerror = true;
      
      if(typeof csserror.skippedstring != "undefined")
        csserror.skippedstring = csserror.skippedstring.trim();

      if(typeof csserror.message != "undefined")
        csserror.message = csserror.message.trim();

      if(csserror.context == ":root"){
        validerror = false;
      }
      else if(typeof csserror.skippedstring != "undefined" && csserror.skippedstring.startsWith("var(--")){
        validerror = false;
      }

      Object.keys(allowed_properties).forEach(function (key) {

        let allowed_property = allowed_properties[key]
        if(csserror.message.startsWith('Property “'+allowed_property+'”')){
          validerror = false;
        }
      });
      
      if(validerror){
        css_errors.push(csserror)
      }
    });

    data.errors = css_errors;

    fs.writeFile('audit/css_validation.json', JSON.stringify(data,null,2), (err) => {  if (err) throw err; done(); });
  });
});

// CSS stats
gulp.task('audit-css-stats', function(done) {

  var css_stats = getcssstats.load('./public/stylesheets/styles.css');
  fs.writeFile('audit/css_stats.json', JSON.stringify(css_stats,null,2), (err) => {  if (err) throw err; done(); });
});
