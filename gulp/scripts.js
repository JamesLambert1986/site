
var config = require('./config.json')
var gulp = require('gulp')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var rollup = require('gulp-better-rollup')
var babel = require('rollup-plugin-babel')
var resolve = require('rollup-plugin-node-resolve')
var rename = require("gulp-rename")

// We process our ES6 javascript files and run babel on them to make them more compatible with older browsers
// We use Babal and rollup to do this, creating a single file
gulp.task('scripts', () => {
  return gulp.src(config.paths.assets + '/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(rollup({
      plugins: [
        resolve(),
        babel({
          presets: [["@babel/preset-env", {"modules": false, "loose": true }]],
          plugins: [
            ["@babel/plugin-transform-shorthand-properties"],
            ["@babel/plugin-transform-arrow-functions"]
          ]})
      ],
      external: ['jquery']
    }, {
      format: 'umd',
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.paths.public + '/scripts/'))
})