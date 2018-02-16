const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const watchify = require('watchify')
const babelify = require('babelify')

console.log(Object.keys($))

gulp.task('scripts:server', () => {
  return gulp.src('./src-server/**/*.js')
    .pipe($.cached('server'))
    .pipe($.babel())
    .pipe(gulp.dest('./build'))
})

gulp.task('watch:scripts:server', gulp.series(
  'scripts:server',
  () => {
    return gulp.watch('./src-server/**/*.js', gulp.series('scripts:server'))
  }
))
