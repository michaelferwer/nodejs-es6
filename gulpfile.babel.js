/**
 * Created by michael on 21/07/2016.
 */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';

const plugins = gulpLoadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore'],
  tests: './tests/*.js'
};

gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
    .pipe(gulp.dest('dist'))
);


gulp.task('default', () => {
  gulp.run('babel');
});