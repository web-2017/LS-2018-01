const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const imagemin = require('gulp-imagemin');

const path = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
}

// pug
function templates() {
    return gulp.src(path.templates.pages)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.styles.dest))
}

// очистка
function clean() {
    return del(path.root);
}

// watch
function watch() {
    gulp.watch(path.styles.src, styles);
    gulp.watch(path.templates.src, templates);
    gulp.watch(path.images.src, images);
}

// webpack
function scripts() {
    return gulp.src('src/scripts/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(path.scripts.dest));
}

// локальный сервер
function server() {
    browserSync.init({
        server: path.root
    });
    browserSync.watch(path.root + '/**/*.*', browserSync.reload);
}

// сжатие картинок
function images() {
    return gulp.src(path.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo(
                [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            )
        ]))
        .pipe(gulp.dest(path.images.dest));
}



exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts),
    gulp.parallel(watch, server)
));