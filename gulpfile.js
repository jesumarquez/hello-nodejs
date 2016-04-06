var gulp = require('gulp');

var paths = {
    static : 'src/client/index.html',
    js: 'src/client/app/app.js'
}

gulp.task('copy-statics', function () {
    gulp.src(paths.static)
        .pipe(gulp.dest('public'));
});

gulp.task('copy-js', function () {
    gulp.src(paths.js)
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
    gulp.watch(paths.static, ['copy-statics']);
    gulp.watch(paths.js, ['copy-js']);
});

gulp.task('default', ['copy-statics', 'copy-js']);