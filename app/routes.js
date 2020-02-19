var express = require('express')
var parseurl = require('parseurl')
var fs = require('fs')
var fm = require('front-matter')
var path = require('path')
var marked = require('marked')
var renderer = new marked.Renderer();
var session = require('express-session')
var router = express.Router()
var app = express()
var nunjucks = require('nunjucks')
var write_md = require('./local_node_modules/write_md.js');
var site_vars = require('./local_node_modules/site_vars.js');

/*
* 1. Routing fixes for existing CSS files
* 
* 2. Catch All
* - Look at the url request
* - Set a default site variables
* - Look at the URL and create the path variable
* 
* 3. Sub Routing 
* - Check the file path and add extra data or replace data
* 
* 4. Check file type
* - Check if page is a marked down page
* - or the page is a html page
* - If the file isn't found then we load in the 404 page
*
*/



// 1. Routing fixes for existing CSS files *************************************************************************
// This is needed for prototype pages that are using the existing Virgin Money Nav
router.get('/public/stylesheets/img/*', function (req, res) {
  res.redirect('/public/images/' + req.params[0])
})
router.get('/virgin/images/*', function (req, res) {
  res.redirect('/public/images/' + req.params[0])
})
router.get('/public/stylesheets/fonts/*', function (req, res) {
  res.redirect('/public/fonts/' + req.params[0])
})
router.get('/virgin/*', function (req, res) {
  res.redirect('/prototype/virgin/' + req.params[0])
})

// 2. Catch all - Rules we always set *************************************************************************
router.get('*', function (req, res) {
  
  // Look at the url request - this creates a var that can be used to check if a corresponding file exists on the server
  let file = req.params[0];
  file = file.replace(/^\/|\/$/g, ''); // Trim the / at the start and end
  file = file.toLowerCase();

  // Get the locals
  res.locals = site_vars.detect(file,res.locals);

  if(res.locals.get.rebrand != 'false'){
    res.locals.get.rebrand = "true";
  }
  else {
    delete res.locals.get.rebrand;
  }
  
  
  // 4. Check file type *************************************************************************
  // Check if page is a marked down page
  var is_markdown = fs.existsSync(path.join(__dirname, '/views/', file + '.md'), 'utf8')
  var is_markdown_index = fs.existsSync(path.join(__dirname, '/views/', file + '/index.md'), 'utf8')
  // or the page is a html page
  var is_index = fs.existsSync(path.join(__dirname, '/views/', file + '/index.html'), 'utf8')
  var is_file = fs.existsSync(path.join(__dirname, '/views/', file + '.html'), 'utf8')
  
  if (is_markdown || is_markdown_index) {
    
    if(is_markdown_index)
      var doc = fs.readFileSync(path.join(__dirname, '/views/', file + '/index.md'), 'utf8')
    else 
      var doc = fs.readFileSync(path.join(__dirname, '/views/', file + '.md'), 'utf8')
    
    page = write_md.load(doc, res.locals, true);

    if(page['page']['layout'])
      res.render(page['page']['layout'], page)
    else 
      res.render('layout', page)
  }
  else if(is_index){
          
    res.render(file+"/index")
  }
  else if(is_file){

    res.render(file)
  }
  else {
    
    // If the file isn't found then we load in the 404 page
    var doc = fs.readFileSync(path.join(__dirname, '/views/404.md'), 'utf8')
    page = write_md.load(doc, res.locals, true);

    if(page['page']['layout'])
      res.render(page['page']['layout'], page )
    else 
      res.render('layout', page)
  }
})

module.exports = router