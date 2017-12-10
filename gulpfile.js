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
const gulpTaskFonts = require('gulp-task-fonts');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

const path = {
    root: './build',
    templates: {
        pages: 'src/templates/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/styles/'
    },
    fonts: {
        src: 'src/styles/fonts/**.*',
        syle: 'src/styles/fonts/stylesheet.scss',
        dest: 'build/styles/fonts/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/scripts/'
    }
}

// pug
function templates() {
    return gulp.src(path.templates.pages)
        .pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.styles.dest))
}

// очистка
function clean() {
    return del(path.root);
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


// fonts
function fonts() {
    return gulp.src(path.fonts.src)
        .pipe(gulp.dest(path.fonts.dest))
}

// watch
function watch() {
    gulp.watch(path.styles.src, styles, fonts);
    gulp.watch(path.templates.src, templates);
    gulp.watch(path.images.src, images);
    gulp.watch(path.scripts.src, scripts);
}

// webpack
function scripts() {
    return gulp.src('src/scripts/main.js')
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

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, fonts, scripts),
    gulp.parallel(watch, server)
));