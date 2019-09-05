var gulp = require('gulp'),
    pug = require('gulp-pug'),
    gutil = require('gulp-util'),
    pleeease = require('gulp-pleeease'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    sass = require('gulp-sass'),
    entities = require('html-entities').XmlEntities,
    replace = require('gulp-replace');//,
    //filelist = require('gulp-filelist');

require('es6-promise').polyfill();

gulp.task('html', function () {
    gulp.src('./markup/*.pug')
        .pipe(pug({
            pretty: true,
            debug: false,
            compileDebug: false
        }))
        .on('error', gutil.log)
        .pipe(replace(entities.decode("&#65279;"), ''))
        .pipe(gulp.dest('../'))
});

gulp.task('css', function () {

    gulp.src(['./styles/global.scss'], { base: '.' })
        //// Generate a source map that displays original file names 
        //// and line numbers in the chrome developer tools
        .pipe(sourcemaps.init())

        .pipe(sass().on('error', sass.logError))

        // minify CSS
        .pipe(pleeease({ out: "bundle.min.css" }))
        .pipe(sourcemaps.write())
        .on('error', gutil.log)
        .pipe(gulp.dest('../../SitefinityWebApp/ResourcePackages/Voyager/assets/dist/css'))
        .pipe(gulp.dest('../css'))
})

gulp.task('watch', ['html', 'css'], function () {
    gulp.watch('./markup/**/*.html', ['html'])
        .on('change', function (e) {
            console.log(e.type, " ---> ", e.path);
        });

    gulp.watch('./markup/**/*.pug', ['html'])
        .on('change', function (e) {
            console.log(e.type, " ---> ", e.path);
        });

    gulp.watch(['./styles/**/*.scss'], ['css'])
        .on('change', function (e) {
            console.log(e.type, " ---> ", e.path);
        });

    //gulp.watch(['../images/**/*.*', '../src/images/**/*.*'], ['kraken'])
    //    .on('change', function (e) {
    //        console.log(e.type, " ---> ", e.path);
    //    });
});

gulp.task('default', ['html', 'css'])
