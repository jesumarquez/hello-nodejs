var gulp = require('gulp');

gulp.task('copy-statics', function () {
    gulp.src('src/client/index.html')
        .pipe(gulp.dest('public'));
})

gulp.task('default',['copy-statics']);