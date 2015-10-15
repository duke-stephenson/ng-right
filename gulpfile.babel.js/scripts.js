/**
 * @author john
 * @version 10/15/15 11:44 AM
 */

import gulp from 'gulp';
import changeLog from 'gulp-conventional-changelog';
import ts from 'gulp-typescript';
import del from 'promised-del';
import merge from 'merge2';
import dtsGen from 'dts-generator';

let project = ts.createProject('src/tsconfig.json', {
  noExternalResolve: true
});


gulp.task('rm', () => {
  return del('lib');
});

gulp.task('ts', () => {
  return project.src()
    .pipe(ts(project))
    .pipe(gulp.dest('lib'));
});

gulp.task('dts-gen', done => {
  dtsGen.generate({
    name: 'ng-right',
    baseDir: './src',
    main: 'ng-right/index',
    files: ['./index.ts', './libs.d.ts', '../typings/tsd.d.ts'],
    out: 'lib/index.d.ts'
  });
  done();
});

gulp.task('run', () => {
  gulp.watch('src/**/*.ts', gulp.series('ts'));
});

gulp.task('default', gulp.series('rm', 'ts', 'dts-gen'));

