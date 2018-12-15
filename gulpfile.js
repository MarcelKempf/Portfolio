/*jshint esversion: 6 */

const gulp            = require('gulp'),
      sass            = require('gulp-sass'),
      cleanCSS        = require('gulp-clean-css'),
      autoprefixer    = require('gulp-autoprefixer'),
      rename          = require('gulp-rename'),
      inject          = require('gulp-inject'),
      uglify          = require('gulp-uglify'),
      concat          = require('gulp-concat'),
      plumber         = require('gulp-plumber'),
      babel           = require('gulp-babel'),
      browserify      = require('gulp-browserify'),          //Import libary (import <x> from 'y';)
      clean           = require('gulp-clean'),
      sourcemaps      = require('gulp-sourcemaps'),
      htmlmin         = require('gulp-html-minifier'),
      imagemin        = require('gulp-imagemin');
      browserSync     = require('browser-sync');             //Browser Server

const src             = './src/',
      dist            = './dist/';

// ############################
// MINIFY/COMPILE SASS
gulp.task('sass', function() {
    gulp.src(dist + 'assets/css/*.css*', {force: true})      //Clean up first (Delete all files)
        .pipe(clean());
    gulp.src(src + 'assets/sass/*.sass')
      .pipe(sourcemaps.init())
          .pipe(plumber())                                  //No gulp restart needed if there's a error
          .pipe(sass().on('error', sass.logError))          //Convert Sass into css
          .pipe(autoprefixer())                             //Prefix: -webkit -o ...
          //.pipe(rename({basename: 'style'}))              //Name of file
          .pipe(cleanCSS())                                 //Minify CSS
          .pipe(rename({ suffix: '.min'}))                  //Add Suffix
      .pipe(sourcemaps.write('.'))                          //Sourcemap helps to find bugs
      .pipe(gulp.dest(dist + 'assets/css'))                 //Target destination
      .pipe(browserSync.stream());                          //Reload server
});

// ############################
// MINIFY HTML
gulp.task('html', function() {
    gulp.src(src + '*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

// ############################
// MINIFY JS
gulp.task('js', function() {
    gulp.src(dist + 'assets/js/*.js*', {force: true})
        .pipe(clean());
    gulp.src(src + 'assets/js/*.js')
      .pipe(sourcemaps.init())
          .pipe(plumber())                                  //No gulp restart needed if there's a error
          //.pipe(concat('global.js'))                      //Concat all files and name it
          .pipe(babel({
            presets: ['es2015'] }))                         //ES6 usable
          .pipe(uglify())                                   //Minify into one line
          .pipe(rename({ suffix: '.min'}))                  //Add Suffix
      .pipe(sourcemaps.write('.'))                          //Sourcemap helps to find bugs
      .pipe(gulp.dest(dist + 'assets/js'))
      .pipe(browserSync.stream());
});

// ############################
// MINIFY/OPTIMIZE IMAGES
gulp.task('img', function() {
    gulp.src(src + 'assets/images/*')
          .pipe(imagemin())                                   //Minify/Compress
          .pipe(rename({ suffix: '.min'}))                    //Add Suffix
      .pipe(gulp.dest(dist + 'assets/images'))
      .pipe(browserSync.stream());
});

// ############################
// TRANSFER ICONS
gulp.task('icons', function() {
    gulp.src(dist + 'assets/icons/*')
        .pipe(clean());
    gulp.src(src + 'assets/icons/*')
      .pipe(gulp.dest(dist + 'assets/icons'))
      .pipe(browserSync.stream());
});

// ############################
// TRANSFER FONTS
gulp.task('fonts', function() {
    gulp.src(src + 'assets/fonts/*')
      .pipe(gulp.dest(dist + 'assets/fonts'))
      .pipe(browserSync.stream());
});

// ############################
// Define SCRIPT Task
gulp.task('all', ['html', 'sass', 'js', 'img', 'icons', 'fonts']);

// ###########################
// WATCH
gulp.task('default', function() {

  browserSync.init({
    server: './dist'
  });

  gulp.watch([src + '*.html'], ['html']);
  gulp.watch([src + 'assets/sass/*.sass'], ['sass']);
  gulp.watch([src + 'assets/js/*.js'], ['js']);
  gulp.watch([src + 'assets/images/*'], ['img']);
  gulp.watch([src + 'assets/icons/*'], ['icons']);
  gulp.watch([src + 'assets/fonts/*'], ['fonts']);
});
