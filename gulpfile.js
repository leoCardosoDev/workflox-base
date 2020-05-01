const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const uglifycss = require('gulp-uglifycss');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const image = require('gulp-image');
const spritesmith = require('gulp.spritesmith');
// const babel = require('gulp-babel'); // TODO: config js enviroment

sass.compiler = require('node-sass');

gulp.task('css', function () {
    return gulp.src('./assets/scss/main.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css/'))    
        
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('image', async () => {
    gulp.src('./assets/img/fixture/*')
      .pipe(image())
      .pipe(gulp.dest('./assets/img/'));
});

gulp.task('sprite', async () => {
    gulp.src('./assets/sprite/items/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }))
    .pipe(gulp.dest('./assets/sprite/'));
});


// build scripts
gulp.task('scripts', async () => {
    gulp.src('./assets/js/fixture/*')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('sass', async () => {
    gulp.src('./assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/scss'));
});

gulp.task('sass-css', async () => {
    gulp.src('./assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'))    
    
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./assets/css/'));    
});

gulp.task('sass-css:watch', () => {
    gulp.watch('./assets/scss/**/*.scss', gulp.series(['sass-css']));
});

gulp.task('sass:build', async () => {
    gulp.src('./assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/scss/'))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css/'))    
    
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./assets/css/'));    
});

gulp.task('watch', () => {
    gulp.watch('./assets/scss/main.css', gulp.series(['css']));
    gulp.watch('./assets/scss/**/*.scss', gulp.series(['sass']));
    gulp.watch('./assets/js/fixture/**/*.js', gulp.series(['scripts']));
    gulp.watch('./assets/sprite/items/*.png', gulp.series(['sprite']));
    gulp.watch('./assets/img/fixture/*', gulp.series(['image']));
});

gulp.task('default', gulp.series(['watch']));