var config = require('./config.json')
var gulp = require('gulp')
var fs = require('fs')
var path = require('path')
var nodemon = require('gulp-nodemon')

// Our local server task
// The scripts for how the server actually works is located in server.js within the root
// Our server is set to restart with any JS or JSON files are changed (exculding the app folder)
gulp.task('server', (done) => {
  nodemon({
    script: 'server.js',
    ext: 'js, json',
    ignore: [config.paths.public + '*',
      config.paths.build + '*',
      config.paths.assets + '*',
      config.paths.nodeModules + '*',
      'audit/*',
      'backstop_data/*'
    ]
  }).on('start', function(){
    setTimeout(done, 500);
  }).on('quit', function () {
    // remove .port.tmp if it exists
    try {
      fs.unlinkSync(path.join(__dirname, '/../.port.tmp'))
    } catch (e) {}

    process.exit(0)
  })
})