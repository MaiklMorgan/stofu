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
    jquery:             './assests/js/jquery-2.2.4.min.js',
    modernizr:             './assests/js/modernizr.js',
    easing:             './assests/js/plugins/jquery.easing.1.3.js',
    bootstrap:          './assests/js/plugins/bootstrap.min.js',
    bxslider:           './assests/js/plugins/jquery.bxslider.min.js',
    filterizr:          './assests/js/plugins/jquery.filterizr.js',
    magnific:           './assests/js/plugins/jquery.magnific-popup.min.js',
    tools:              './assests/js/plugins/revolution/js/jquery.themepunch.tools.min.js',
    revolution:         './assests/js/plugins/revolution/js/jquery.themepunch.revolution.min.js',
    actions:            './assests/js/plugins/revolution/js/extensions/revolution.extension.actions.min.js',
    carousel:           './assests/js/plugins/revolution/js/extensions/revolution.extension.carousel.min.js',
    kenburn:            './assests/js/plugins/revolution/js/extensions/revolution.extension.kenburn.min.js',
    layeranimation:     './assests/js/plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js',
    migration:          './assests/js/plugins/revolution/js/extensions/revolution.extension.migration.min.js',
    navigation:         './assests/js/plugins/revolution/js/extensions/revolution.extension.navigation.min.js',
    parallax:           './assests/js/plugins/revolution/js/extensions/revolution.extension.parallax.min.js',
    slideanims:         './assests/js/plugins/revolution/js/extensions/revolution.extension.slideanims.min.js',
    video:              './assests/js/plugins/revolution/js/extensions/revolution.extension.video.min.js',
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
      path: './html/layouts'
    }))
    .pipe(gulp.dest('./site'));
});

// Copy fonts
gulp.task('copy', function(){
  gulp.src('./assests/fonts/**/*')
  .pipe(gulp.dest('./site/fonts'));
});

//Copy php
gulp.task('copy-php', function(){
  gulp.src('./php/*')
  .pipe(gulp.dest('./site/php'));
});

// Compile js to min
gulp.task('js', function () {
  return gulp.src([paths.js.jquery, paths.js.modernizr, paths.js.easing, paths.js.bootstrap, paths.js.bxslider, paths.js.filterizr, paths.js.magnific, paths.js.tools, paths.js.revolution, paths.js.actions, paths.js.carousel, paths.js.kenburn, paths.js.layeranimation, paths.js.migration, paths.js.navigation, paths.js.parallax, paths.js.slideanims, paths.js.video, paths.js.main])
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
    gulp.run('watch', 'sass', 'html', 'js', 'image', 'copy', 'copy-php', 'browser-sync');
});
