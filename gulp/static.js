var pjson = require('./../package.json');
var gulp = require('gulp')
var config = require('./config.json')
var runSequence = require('run-sequence')
var clean = require('gulp-clean')
var fs = require('fs')
var fm = require('front-matter')
var path = require('path')
var marked = require('marked')
var nunjucks = require('nunjucks')
nunjucksAppEnv = nunjucks.configure(['./app/views']); // Fix the views folder as we aren't in the app folder now
var write_md = require('../app/local_node_modules/write_md.js');
var site_vars = require('../app/local_node_modules/site_vars.js');

var postcss = require('gulp-postcss');

var utils = require('../app/utils.js')
utils.addNunjucksFilters(nunjucksAppEnv)

var uglify = require('gulp-uglify')





// Create the files 
gulp.task('static', function(done) {

  // Gets the list of files within a folder recursively
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

  // Used to make sure dir are created
  function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
      const curDir = path.resolve(baseDir, parentDir, childDir);
      console.log(curDir);
      try {
        fs.mkdirSync(curDir);
      } catch (err) {
        if (err.code === 'EEXIST') { // curDir already exists!
          return curDir;
        }

        // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
        if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
          throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
        }

        const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
        if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
          throw err; // Throw if it's just the last created dir.
        }
      }

      return curDir;
    }, initDir);
  }
/*
  // Generate SVG html
  // Static html wont be able to read external SVG files so we need to embed our icons into all of the pages
  //var SVGfilelist = walkSync('./public/svg');
  var svghtml = "";

  // Rebrand only have a few SVG files
  var SVGfilelist = [ 
    //'./public/svg/brand.svg',
    //'./public/svg/core.svg',
    //'./public/svg/general.svg',
    //'./public/svg/living.svg',
    './public/svg/logo.svg',
    //'./public/svg/lounges.svg',
   // './public/svg/pattern-repeat-white.svg',
    //'./public/svg/pattern-repeat.svg',
    './public/svg/pattern.svg',
    './public/svg/rebrand-ui.svg',
    './public/svg/social.svg',
    //'./public/svg/savings.svg',
    //'./public/svg/ui.svg',
    //'./public/svg/vmg.svg' 
  ]

  SVGfilelist.forEach(function(svgfile) {


    let temphtml = fs.readFileSync(svgfile, 'utf8')

    if(svgfile == "./public/svg/ui.svg"){

      temphtml = temphtml.replace(/id="/g,'id="ui-');
      temphtml = temphtml.replace(/xlink:href="#/g,'xlink:href="#ui-');
    }
    else if(svgfile == "./public/svg/brand.svg"){

      temphtml = temphtml.replace(/id="/g,'id="brand-');
      temphtml = temphtml.replace(/xlink:href="#/g,'xlink:href="#brand-');
    }

    svghtml += temphtml;
  });
*/
  var writeFile = function(filename,data,oldstyle=false){

      // Ceate file and make sure dir exists
      var actualFilename = filename.replace('/prototype/old/','/prototype/')
      var doc = fs.readFileSync(actualFilename, 'utf8')

      var writeFolder = './docs/';

      var newfile = filename.replace('./app/views/',writeFolder).replace('.md','/index.html')
      var newdir = filename.replace('./app/views/',writeFolder).replace('.md','').replace('.html','')

      if(filename.endsWith('index.md')){
        newfile = filename.replace('./app/views/',writeFolder).replace('.md','.html')
        newdir = filename.replace('./app/views/',writeFolder).replace('index.md','').replace('index.html','')
      }

      mkDirByPathSync(newdir);


      // Override global vars depending upon file location, i.e. VMG has different vars
      var filepath = actualFilename.replace('./app/views/','')
      
      let locals = new Array;

      locals = site_vars.detect(filepath,locals);

      locals.get = new Array;
      locals.static = true;
      // Pass through query string variables
      
      if(typeof data != "undefined" & oldstyle == false){

        data['rebrand'] = 'true';

        locals.get = data;
      }
      else if(oldstyle == false) {

        locals.get = {'rebrand':'true'};
      }
      
      
      var page = write_md.load(doc, locals, true);

      if(typeof page.page.layout != "undefined"){
          
        if(fs.existsSync('./app/views/'+page.page.layout+'.html')){
          var layout = fs.readFileSync('./app/views/'+page.page.layout+'.html', 'utf8')
        }
        else {
          var layout = fs.readFileSync('./app/views/layout.html', 'utf8')
        }
      }
      else {

      // Render the layout.html and pass through the page array
      var layout = fs.readFileSync('./app/views/layout.html', 'utf8')
      }

      html = nunjucks.renderString(layout,page);
      // Re-run to make sure all blocks are processed
      //html = nunjucks.renderString(html,page);

      // Fix the file paths for stuff like CSS
      var replacePath = ''
      newfile.replace(writeFolder,'.').replace('/index.html','').split('/').forEach(function(path) {
        
        replacePath += '../'
      });

      if(newfile == writeFolder+"index.html"){
        replacePath = ''
      }
      
      // Update the new file path if this is a varient of the page with a query string
      if(typeof data != "undefined" && data != false){

        var query = JSON.stringify(data);
        query = query.replace(/\"/g,"").replace(/:/g,"-").replace(/{/g,'').replace(/}/g,'');
        newfile = newfile.replace('.html','_'+query+'.html')
      }

      // remove SVG file refs
      html = html.replace(/\/public\/svg\/ui.svg#/g,'#ui-')
      html = html.replace(/\/public\/svg\/brand.svg#/g,'#brand-')
      html = html.replace(/\/public\/svg\/(.*).svg#/g,'#')
      // Add in the SVG files into the html file
     // html = html.replace('<!-- static svgs -->','<div class="sr-only">'+svghtml+'</div>')
      
      // Fix the public refs to be relative
      html = html.replace(/\/public\//g,replacePath+'assets/')

      // Fix the 
      html = html.replace(/sw.js/g,replacePath+'sw.js')


      // Fix urls to be relative
      html = html.replace(/href="\/([^"]*)/g,'href="'+replacePath+'$1/index.html');
      html = html.replace(/value="\/([^"]*)/g,'value="'+replacePath+'$1/index.html');
      
      // Write out the file
      fs.writeFile(newfile, html, (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
  }


  // Location of files we are going to create stic versions of
  var filelist = walkSync('./app/views');

  // Foreach markdown page in the folder process the markdown and nunjucks into static html
  filelist.forEach(function(filename) {

    if(filename.endsWith('.md')){
      
      writeFile(filename);


      // Pages which use query string to change the content
      if(filename == "./app/views/prototype/virgin/service/sign-in.md"){

        var data = { "product":"credit-cards" };
        writeFile(filename,data);

        data = { "product":"prepaid-cards" };
        writeFile(filename,data);
      }

      console.log(filename);
    }

  });
  done();
});
