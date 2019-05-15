var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var header = require('gulp-header');

var cssHeader = '/*! svgMap | https://github.com/StephanWagner/svgMap | MIT License | Copyright Stephan Wagner | https://stephanwagner.me */' + "\n";
var jsHeader = cssHeader + '/*! svg-pan-zoom | https://github.com/ariutta/svg-pan-zoom | BSD 2-Clause "Simplified" License | Copyright Andrea Leofreddi <a.leofreddi@itcharm.com> */' + "\n";

// CSS
var styles = [{
  name: 'svgMap',
  src: ['./src/scss/main.scss'],
  srcWatch: ['./src/scss/**/*.scss'],
  dest: './dist/'
}];

// JavaScript
var scripts = [{
  name: 'svgMap',
  src: [
    './node_modules/svg-pan-zoom/dist/svg-pan-zoom.js',
    './src/js/svgMap.js',
    './src/js/data/**/*.js',
    './src/js/svgMap/**/*.js',
    './src/js/umd.js'
  ],
  dest: './dist/'
}];

// Config tasks
let defaultTasks = [];
let buildTasks = [];
let watchTasks = [];

// Config CSS tasks
for (const item of styles) {

  // Concat CSS
  const cssConcat = function () {
    return gulp
      .src(item.src)
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(concat(item.name + '.css'))
      .pipe(header(cssHeader))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('cssConcat-' + item.name, cssConcat);

  // Add to default tasks
  defaultTasks.push('cssConcat-' + item.name);

  // Add to watch tasks
  watchTasks.push({
    src: item.src,
    task: cssConcat
  });

  // Build CSS
  const cssBuild = function () {
    return gulp
      .src(item.dest + item.name + '.css')
      .pipe(rename(item.name + '.min.css'))
      .pipe(cleanCSS({
        level: {
          1: {
            specialComments: 0
          }
        }
      }))
      .pipe(header(cssHeader))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('cssBuild-' + item.name, cssBuild);

  // Add to build tasks
  buildTasks.push('cssBuild-' + item.name);
}

// Config JavaScript tasks
for (let item of scripts) {

  // Concat JavaScript
  const jsConcat = function () {
    return gulp
      .src(item.src)
      .pipe(sourcemaps.init())
      .pipe(concat(item.name + '.js'))
      .pipe(header(jsHeader))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('jsConcat-' + item.name, jsConcat);

  // Add to default tasks
  defaultTasks.push('jsConcat-' + item.name);

  // Add to watch tasks
  watchTasks.push({
    src: item.src,
    task: jsConcat
  });

  // Build JavaScript
  const jsBuild = function () {
    return gulp
      .src(item.dest + item.name + '.js')
      .pipe(rename(item.name + '.min.js'))
      .pipe(uglify())
      .pipe(header(jsHeader))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('jsBuild-' + item.name, jsBuild);

  // Add to build tasks
  buildTasks.push('jsBuild-' + item.name);
}

// Watch tasks
function watch() {
  for (const watchTask of watchTasks) {
    gulp.watch(watchTask.src, watchTask.task);
  }
}

exports.default = gulp.series(defaultTasks);
exports.watch = gulp.series(defaultTasks, watch);
exports.build = gulp.series(defaultTasks, buildTasks);
