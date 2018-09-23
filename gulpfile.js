var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function() {
    return gulp.src(['./js/main.js', './js/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./'));
});