/**
 * @author john
 * @version 10/9/15 11:00 AM
 */


import gulp from 'gulp';
import changeLog from 'gulp-conventional-changelog';
import ts from 'gulp-typescript';
import del from 'promised-del';
import merge from 'merge2';
import dtsGen from 'dts-generator';

import './scripts';
import './tests';

gulp.task('changelog', () => {
  return gulp.src('changelog.md')
    .pipe(changeLog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

