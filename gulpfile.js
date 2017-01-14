/* eslint-disable */

/**
 * This gulpfile will copy static libraries and a index.html file as well as
 * merge, babelify and uglify the rest of the javascript project.
 *
 */

const watchify = require('watchify');
const browserify = require('browserify');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const size = require('gulp-size');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify'); // eslint-disable-line
const assign = require('lodash.assign');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync');

const distpath = 'dist';

const customOpts = {
  entries: ['./src/js/index.js'],
  debug: true,
  transform: [['babelify', { presets: ['es2015'], ignore: ['./src/libs/**'] }]],
  ignore: ['./src/libs/**'],
};
const opts = assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));

const polyfill_opts = { entries: ['./src/js/polyfills.js']};
const opts_pf = assign({}, watchify.args, customOpts, polyfill_opts);
const pf = watchify(browserify(opts));

b.on('log', gutil.log);
pf.on('log', gutil.log);


/**
 * This task will copy all files from libs into 'dist/libs'.
 * If you want to process them, just add your code to this task.
 */
gulp.task('langs', function() {
  return gulp.src(['./src/lang/**'])
    .pipe(plumber())
    .pipe(gulp.dest(distpath + '/lang'))
});

/**
 * This task will copy all files from media into 'dist/media'.
 * If you want to process them, just add your code to this task.
 */
gulp.task('images', ['langs'], function()
{
  return gulp.src(['./img/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest(distpath + '/img'));
});

/**
 * This task will copy index.html into 'dist'.
 * If you want to process it, just add your code to this task.
 */
gulp.task('index', ['images'], function()
{
  return gulp.src(['./src/index.html'])
    .pipe(plumber())
    .pipe(gulp.dest(distpath));
});

gulp.task('sections', ['index'], function()
{
  return gulp.src(['./src/sections/*.html'])
    .pipe(plumber())
    .pipe(gulp.dest(distpath + '/sections'));
});

gulp.task('css', ['sections'], function () {
  var processors = [
    require("postcss-import")(),
    require("postcss-url")(),
    require("postcss-cssnext")(),
    require("cssnano")({ autoprefixer: false }),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")(),
  ];
  return (
    gulp.src('./src/css/index.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(rename("app.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(size())
    .pipe(gulp.dest(distpath))
  );
})

gulp.task('polyfills', ['css'], function()
{
  return browserify('./src/js/polyfills.js')
    .bundle()
    .pipe(source('polyfills.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest(distpath));
  // return pf.bundle()
  //   .on('error', function(err)
  //   {
  //     console.log(err.message);
  //     browserSync.notify(err.message, 3000);
  //     this.emit('end');
  //   })
  //   .pipe(plumber())
  //   .pipe(source('polyfills.js'))
  //   .pipe(buffer())
  //   .pipe(size())
  //   .pipe(gulp.dest(distpath));
});

/**
 * This task will bundle all other js files and babelify them.
 * If you want to add other processing to the main js files, add your code here.
 */
gulp.task('bundle', ['polyfills'], function()
{
  return b.bundle()
    .on('error', function(err)
    {
      console.log(err.message);
      browserSync.notify(err.message, 3000);
      this.emit('end');
    })
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(size())
    .pipe(gulp.dest(distpath));
});

/**
 * This task starts watching the files inside 'src'. If a file is changed,
 * removed or added then it will run refresh task which will run the bundle task
 * and then refresh the page.
 *
 * For large projects, it may be beneficial to separate copying of libs and
 * media from bundling the source. This is especially true if you have large
 * amounts of media.
 */
gulp.task('watch', ['bundle'], function()
{
  const watcher = gulp.watch('./src/**/*', ['refresh']);
  watcher.on('change', function(event)
  {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});


/**
 * This task starts browserSync. Allowing refreshes to be called from the gulp
 * bundle task.
 */
gulp.task('browser-sync', ['watch'], function()
{
  return browserSync({ server:  { baseDir: distpath } });
});

/**
 * This is the default task which chains the rest.
 */
gulp.task('default', ['browser-sync']);

/**
 * Using a dependency ensures that the bundle task is finished before reloading.
 */
gulp.task('refresh', ['bundle'], browserSync.reload);
