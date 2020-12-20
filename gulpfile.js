const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/bundle.js').on('change', browserSync.reload);
});

gulp.task('styles', () => gulp.src('src/scss/**/*.+(scss|sass)')
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(rename({
    prefix: '',
    suffix: '.min',
  }))
  .pipe(autoprefixer({
    cascade: false,
  }))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream()));

gulp.task('watch', () => {
  gulp.watch('src/scss**/*.+(sass|scss|css)', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', () => (gulp.src('src/*.html'))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./dist')));

gulp.task('fonts', () => (gulp.src('src/fonts/**/*'))
  .pipe(gulp.dest('./dist/fonst')));

gulp.task('img', () => (gulp.src('src/assets/images/**/*'))
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/assets/images')));

gulp.task('mp3', () => (gulp.src('src/assets/mp3/**/*'))
  .pipe(gulp.dest('./dist/assets/mp3')));

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'fonts', 'mp3', 'img'));
