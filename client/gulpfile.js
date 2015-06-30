require('harmonize')(); // workaround for gulp jest
var gulp = require('gulp'),
    jest = require('gulp-jest'),
    del = require('del'),
    run = require('gulp-run'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    pack = require('./package.json'),
    harmonize = require('harmonize'),
    reload = browserSync.reload;

gulp.task('bower', function () {
    run('bower install').exec();
})

    .task('test', function () {
        return gulp.src('test').pipe(jest({
            unmockedModulePathPatterns: [
                "node_modules/react"
            ],
            testDirectoryName: "test",
            testPathIgnorePatterns: [
                "node_modules",
                "bower_compontents"
            ],
            moduleFileExtensions: [
                "js",
                "json",
                "react"
            ]
        }));
    })

    .
    task('clean', function (cb) {
        del(['dist/**'], cb);
    })

    .task('server', function () {
        browserSync({
            server: {
                baseDir: './app/'
            }
        });
    })

    .task('less', function () {
        return gulp.src(pack.paths.less)
            .pipe(less())
            .pipe(concat(pack.dest.style))
            .pipe(gulp.dest(pack.dest.dist));
    })
    .task('less:min', function () {
        return gulp.src(pack.paths.less)
            .pipe(less())
            .pipe(concat(pack.dest.style))
            .pipe(cssmin())
            .pipe(gulp.dest(pack.dest.dist));
    })

    .task('lint', function () {
        return gulp.src(pack.paths.js)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    })

    .task('js', function () {
        return browserify(pack.paths.app)
            .transform(reactify)
            .bundle()
            .pipe(source(pack.dest.app))
            .pipe(gulp.dest(pack.dest.dist));
    })
    .task('js:min', function () {
        return browserify(pack.paths.app)
            .transform(reactify)
            .bundle()
            .pipe(source(pack.dest.app))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(pack.dest.dist));
    })

    .task('serve', ['bower', 'clean', 'lint', 'less', 'js', 'server'], function () {
        return gulp.watch([
            pack.paths.js, pack.paths.jsx, pack.paths.html, pack.paths.less
        ], [
            'lint', 'less', 'js', browserSync.reload
        ]);
    })
    .task('serve:minified', ['bower', 'clean', 'lint', 'less:min', 'js:min', 'server'], function () {
        return gulp.watch([
            pack.paths.js, pack.paths.jsx, pack.paths.html, pack.paths.less
        ], [
            'lint', 'less:min', 'js:min', browserSync.reload
        ]);
    });