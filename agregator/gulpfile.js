const {series, parallel, src, dest, watch} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');

function watchServer() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('./src/pages/**/*.pug', pugHtml);
  watch('./src/static/styles/**/*.scss', buildStyles);
  watch('dist/*.html').on('change', browserSync.reload);
}

function clean() {
  return del('dist');
}

function fonts() {
  return src('./src/static/fonts/*.*')
    .pipe(dest('./dist/static/fonts'))
}

function pugHtml() {
  return src('./src/pages/**/*.pug')
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(dest('./dist'));
}

function buildStyles() {
  return src('./src/static/styles/styles.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./dist/static/css'))
    .pipe(browserSync.stream());
}

function images() {
  return src('./src/static/images/**/*.*')
    .pipe(dest('./dist/static/images'))
}

exports.default = series(
  clean,
  parallel(
    fonts,
    images,
    pugHtml,
    buildStyles
  ),
  watchServer
);
