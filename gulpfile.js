var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var header = require('gulp-header');
var pkg = require('./package.json');

var cssHeader = jsHeader = '/*! svg-worldmap v<%= pkg.version %> | https://github.com/StephanWagner/svg-worldmap | MIT License | Copyright Stephan Wagner | https://stephanwagner.me */' + "\n";
jsHeader += '/*! svg-pan-zoom v3.6.0 | https://github.com/ariutta/svg-pan-zoom | BSD 2-Clause "Simplified" License | Copyright Andrea Leofreddi <a.leofreddi@itcharm.com> */' + "\n";

var paths = {
  styles: {
    src: './src/scss/main.scss',
    watch: './src/scss/**/*.scss',
  },
  scripts: {
    src: [
      './node_modules/svg-pan-zoom/dist/svg-pan-zoom.js',
      './src/js/svg-worldmap.js',
      './src/js/data/**/*.js',
      './src/js/svg-worldmap/**/*.js',
      './src/js/stand-alone.js'
    ],
    entries: './src/js/stand-alone.js',
  },
  dest: './dist/'
};

gulp.task('styles-dev', function () {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('svg-worldmap.css'))
    .pipe(header(cssHeader, {
      pkg: pkg
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('styles-prod', ['styles-dev'], function () {
  return gulp
    .src(paths.dest + 'svg-worldmap.css')
    .pipe(rename('svg-worldmap.min.css'))
    .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
    .pipe(header(cssHeader, {
      pkg: pkg
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('scripts-dev', function () {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('svg-worldmap.js'))
    .pipe(header(jsHeader, {
      pkg: pkg
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('scripts-prod', ['scripts-dev'], function () {
  return gulp.src(paths.dest + 'svg-worldmap.js')
    .pipe(rename('svg-worldmap.min.js'))
    .pipe(uglify())
    .pipe(header(jsHeader, {
      pkg: pkg
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('build', ['styles-prod', 'scripts-prod']);

gulp.task('default', ['styles-dev', 'scripts-dev']);

gulp.task('watch', ['styles-dev', 'scripts-dev'], function () {
  gulp.watch([paths.styles.watch], ['styles-dev']);
  gulp.watch([paths.scripts.src], ['scripts-dev']);
});