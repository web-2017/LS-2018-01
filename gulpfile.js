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
const svgSprite = require('gulp-svg-sprites');
const cheerio = require('gulp-cheerio');


const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
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
        svg: 'src/images/icons/*.svg',
        dest: 'build/images/'
    },
    svg: {
      src: 'src/images/icons/*.svg',
      dest: 'build/images/icons'
  },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/scripts/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.root));
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
        .pipe(gulp.dest(paths.styles.dest))
}

// очистка
function clean() {
    return del(paths.root);
}

// сжатие картинок
function images() {
    return gulp.src(paths.images.src)
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
        .pipe(gulp.dest(paths.images.dest));
}

// svg
function spriteBuild() {
  return gulp.src(paths.svg.src)
      .pipe(cheerio({
          run: function ($) {
              $('[fill]').removeAttr('fill');// удаляем инлайновое назначение цвета чтобы в css задать
          }
      }))
      .pipe(svgSprite({
          mode: "symbols",
          preview: false
      }))//к иконке теперь можно обращаться img/svg/symbols.svg#icon
      .pipe(gulp.dest(paths.build.img))
};

// fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}

// webpack
function scripts() {
    return gulp.src('src/scripts/main.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// watch
function watch() {
    gulp.watch(paths.styles.src, styles, fonts);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}



// локальный сервер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
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