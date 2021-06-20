"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync");
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const pug = require('gulp-pug');

const dist = "./dist/";

gulp.task('styles', function() {
  return gulp.src("src/scss/**/*.+(scss|sass)")
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(autoprefixer())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest("dist/css"))
      .on("end", browserSync.reload);
});



gulp.task('html', function () {
  return gulp.src("src/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("dist/"))
      .on("end", browserSync.reload);
});

gulp.task('fonts', function () {
  return gulp.src("src/fonts/**/*")
      .pipe(gulp.dest("dist/fonts"))
      .on("end", browserSync.reload);
});

gulp.task('icons', function () {
  return gulp.src("src/icons/**/*")
      .pipe(gulp.dest("dist/icons"))
      .on("end", browserSync.reload);
});

gulp.task('images', function () {
  return gulp.src("src/img/**/*")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"))
      .on("end", browserSync.reload);
});

gulp.task('favicon', function () {
  return gulp.src("src/favicon/*")
      .pipe(gulp.dest("dist/favicon/"))
      .on("end", browserSync.reload);
});

gulp.task('pug', function() {
  return gulp.src('src/pug/pages/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('dist'))
      .on("end", browserSync.reload);
})

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'js/script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browserSync.reload);
});

gulp.task("watch", () => {
    browserSync({
        server: {
            baseDir: "./dist/",
            serveStaticOptions: {
                extensions: ["html"]
            }
        },
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/pug/pages/*.pug").on('change', gulp.parallel('pug'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
    gulp.watch("src/favicon/*").on('all', gulp.parallel('favicon'));
});


gulp.task("build", gulp.parallel('watch', 'styles', 'fonts', 'icons', 'images', 'favicon', 'build-js', 'pug'));


gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));