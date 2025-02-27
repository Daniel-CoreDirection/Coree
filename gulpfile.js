const { src, dest, watch, series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Paths
const paths = {
    css: 'css/**/*.css',
    js: 'js/**/*.js'
};

// Minify CSS
function minifyCSS() {
    return src(paths.css)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('css')); // Output to the same folder
}

// Minify JS
function minifyJS() {
    return src(paths.js)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('js')); // Output to the same folder
}

// Watch files for changes
function watchFiles() {
    watch(paths.css, minifyCSS);
    watch(paths.js, minifyJS);
}

// Default task
exports.default = series(minifyCSS, minifyJS);
exports.watch = watchFiles;
