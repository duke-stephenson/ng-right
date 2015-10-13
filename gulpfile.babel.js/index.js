/**
 * @author john
 * @version 10/9/15 11:00 AM
 */


import gulp from 'gulp';
import changeLog from 'gulp-conventional-changelog';
import ts from 'gulp-typescript';
import dts from 'dts-bundle';
import del from 'promised-del';
import merge from 'merge2';
import dtsGen from 'dts-generator';

let project = ts.createProject('tsconfig.json', {
  noExternalResolve: true
});

gulp.task('changelog', () => {
  return gulp.src('changelog.md')
    .pipe(changeLog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('rm', () => {
  return del('lib');
});


gulp.task('ts', () => {
  return project.src({base: './ts'})
    .pipe(ts(project))
    .pipe(gulp.dest('lib'));
});

gulp.task('dts-gen', done => {
  dtsGen.generate({
    name: 'ng-right',
    baseDir: './ts',
    main: 'ng-right/index',
    files: ['./index.ts', './libs.d.ts', '../typings/tsd.d.ts'],
    out: 'lib/ts/index.d.ts'
  });
  done();
});

gulp.task('run', () => {
  gulp.watch('ts/**/*.ts', gulp.series('ts'));
});

gulp.task('default', gulp.series('rm', 'ts', 'dts-gen'));
