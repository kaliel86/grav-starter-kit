var gulp = require('gulp'),
    $ = require("gulp-load-plugins")(),
    browserSync = require('browser-sync').create(),
    theme_name = 'kaliel',
    path = {
        proxy: "localhost/yourwebsite",
        server: './',
        scss: "user/themes/" + theme_name + "/scss/",
        img: "user/themes/" + theme_name + "/images/",
        js: "user/themes/" + theme_name + "/js/",
        css: "user/themes/" + theme_name + "/css/",
        refresh: ["**/*.yaml", "**/*.twig", "js/*.js"]
    };


gulp.task('sass', function () {
    gulp.src(path.scss + "*.scss")
        .pipe($.sass({
            onError: console.error.bind(console, 'SASS Error:')
        }))
        .pipe($.autoprefixer('last 2 versions'))
        .pipe($.cssnano())
        .pipe(gulp.dest(path.css))
        .pipe(browserSync.stream())
});

gulp.task('js', function () {
    return gulp.src([path.js + 'lib/*.js', path.js + 'app.js'])
        .pipe($.concat('app.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(path.js))
});

gulp.task('browser-sync', function () {
    var options;
    if (path.proxy) {
        options = {proxy: path.proxy};
    } else {
        options = {server: {baseDir: path.server}}
    }
    browserSync.init(options);
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(path.scss + '**/*.scss', ['sass']);
    gulp.watch(path.js + 'app.js', ['js']);
    gulp.watch(path.refresh).on('change', browserSync.reload);
});