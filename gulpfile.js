var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');
var watchify = require('gulp-watchify');
var reactify = require('reactify');

var paths = {
  test: 'test/**/*.test.js',
  front: {
    watch: ['front/**/*.js'],
    entry: ['front/app.js'],
    dest: 'public/',
  },
};

gulp.task('front-watch', watchify(function(watchify) {
  return gulp.src(paths.front.entry)
  .pipe(watchify({
    watch: false,
    transform: [reactify],
    debug: true,
  }))
  .pipe(gulp.dest(paths.front.dest));
}));

gulp.task('test', function() {
  return gulp
  .src([paths.test])
  .pipe(mocha({
    env: {NODE_ENV: 'test'},
    istanbul: true,
  }));
});

gulp.task('watch', ['front-watch'], function() {
  gulp.watch(paths.test, ['test']);
  gulp.watch(paths.front.watch, ['front-watch']);
});