
const
    gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpIf = require('gulp-if'),
    bs = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

const jsFiles = [
    'src/js/jquery-3.3.1.min.js',
    'src/js/main.js',
    'src/js/slider.js'
];

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', () => {
    return gulp.src('src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/**.*', {base: 'src'})
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('images', () => {
    return gulp.src('src/img/**.*')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('serve', () => {
    bs.init({
        server: 'dist'
    });
    bs.watch('src/**/**.*').on('change', bs.reload)
});

gulp.task('watch', () => {
    gulp.watch('src/index.html', gulp.series('html'));
    gulp.watch('src/styles/**.scss', gulp.series('styles'));
    gulp.watch('src/fonts/**/**.*', gulp.series('fonts'));
    gulp.watch(jsFiles, gulp.series('js'));
    gulp.watch('src/img/**.*', gulp.series('images'));
});

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'styles', 'fonts', 'js', 'images')));

gulp.task('develop', gulp.series('build', gulp.parallel('watch', 'serve')));