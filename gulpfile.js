/// <vs />
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;
var addsrc = require("gulp-add-src");


var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var prod_config = require('./webpack.config.prod');
var ghPages = require('gulp-gh-pages');

var clean = require('gulp-clean');



var src = {
    scss: 'assets/sass/**/*.scss',
    css: 'assets/css',
    html: ['Views/**/*.cshtml', '*.html'],
    //js: 'assets/js/**/*.js',
  //  svg:'assets/images/**/*.svg'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync({
        //server: "./"
       startPath: "/",
        proxy: "localhost:8080"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
  //  gulp.watch(src.svg).on('change', reload);
    gulp.watch(src.js /*, ['babel']*/).on('change', function () {
        reload();
    });
});

// Compile sass into CSS
gulp.task('sass', function () {
    return gulp.src(src.scss)
               .pipe(plumber())
       // .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'compressed',
        }))
         .pipe(autoprefixer({
             browsers: ['last 50 versions'],
             cascade: false
         }))
        .pipe(gulp.dest(src.css))
        .pipe(browserSync.stream());
});


gulp.task("webpack-dev-server", function(callback) {

    new WebpackDevServer(webpack(config), {
        contentBase: './',
        publicPath: '/',
        hot: true,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' }

    }).listen(8080, 'localhost', function (err, result) {
        if (err) { return console.log(err); }
        console.log('Listening at http://localhost:8080/');
    });

});

gulp.task('clean-bundle', function () {
    return gulp.src('assets/js/bundle.js', { read: false })
        .pipe(clean());
});
gulp.task('build-bundle', function() {
    webpack(prod_config, function (err, stats) {
        console.log(err)
    });
});
gulp.task('copy', function() {

    return gulp.src(['./assets/**/*'])
        .pipe(gulp.dest('./public/assets'))
        .pipe(addsrc('index.html'))
        .pipe(gulp.dest('./public/'));


});
// gulp.task('deploy-gh', function() {
//
//     return gulp.src('./public')
//         .pipe(ghPages());
//
//
// });

gulp.task('default', ['clean-bundle','serve', 'webpack-dev-server']);

gulp.task('deploy', ['build-bundle', 'copy']);