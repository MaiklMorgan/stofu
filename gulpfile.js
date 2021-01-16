'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync').create(),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  lr = require('tiny-lr'),
  server = lr(),
  nunjucksRender = require('gulp-nunjucks-render'),
  reload = browserSync.reload;


// List of directories
const paths = {
  js: {
    jquery:             './assests/js/jquery.js',
    jqueryui:           './assests/js/jquery-ui.min.js',
    bootstrap:          './assests/js/bootstrap.min.js',
    slick:              './assests/js/slick.js',
    main:               './assests/js/main.js'
  },
};

// Compile sass files to css
gulp.task('sass', function () {
  gulp.src('./assests/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 12 versions'],
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(gulp.dest('./site/css'))
    .pipe(browserSync.reload({stream:true}));
});

// Compile pug files to html
// gulp.task('pug', () =>{
//   return gulp.src('_html/*.html')
//     .pipe(pug())
//     .pipe(gulp.dest('./site'))
// });

gulp.task('html', function() {
  gulp.src("./html/pages/**/*.+(html|njk)")
    .pipe(nunjucksRender({
      path: ['./html/layouts', './html/pages/includes']
    }))
    .pipe(gulp.dest('./site'));
});

// Copy fonts
gulp.task('copy', function(){
  gulp.src('./assests/fonts/**/*')
  .pipe(gulp.dest('./site/fonts'));
});

// Compile js to min
gulp.task('js', function () {
  return gulp.src([paths.js.jquery, paths.js.jqueryui, paths.js.bootstrap, paths.js.slick, paths.js.main])
  .pipe(concat('main.js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(livereload(server))
  .pipe(gulp.dest('./site/js'));
});

/*
* Minify all image
*/
gulp.task('image', () => {
  return gulp.src('./assests/image/**/*.+(png|jpg|gif|svg|jpeg)')
  .pipe(plumber())
  .pipe(changed('./site/image'))
  .pipe(gulp.dest('./site/image'));
});

// the working directory
gulp.task('browser-sync', ['sass', 'html', 'js'] ,function() {
  browserSync.init({
      server: {
          baseDir: "./site"
      }
  });
});

// Watch files comiling
gulp.task('watch', function () {
  gulp.watch('./assests/scss/*.scss', ['sass']);
  gulp.watch('./html/**/*.html', ['html']);
  gulp.watch('./site/*.html').on('change', reload);
  gulp.watch('./assests/js/*.js', ['js']);
  gulp.watch('./site/js/*.js').on('change', reload)
});


// Clean
gulp.task('clean', () => {
  return gulp.src(['site/css', 'site/js', 'site/image', 'site/fonts', 'site/index.html'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], () => {
    gulp.run('watch', 'sass', 'html', 'js', 'image', 'copy', 'browser-sync');
});
